// @flow

import assign from 'lodash/assign';
import cloneDeepWith from 'lodash/cloneDeepWith';
import isArray from 'lodash/isArray';
import some from 'lodash/some';

import ResultCollector from './ResultCollector';

import type Condition from './Condition';

export default class ValidationState {
  root: any;
  value: any;
  path: string[];
  container: ?Object;
  typeCollector: ResultCollector;
  collector: ResultCollector;
  emptyValues: any[];

  constructor(state: ?Object = {}) {
    assign(this, {
      root: null,
      path: [],
      value: null,
      collector: null,
      emptyValues: [null, undefined]
    }, state);

    if (!this.collector) {
      this.collector = new ResultCollector();
    }
  }

  get isValid(): boolean {
    return this.collector.rejected.length === 0;
  }

  accept(condition: Condition): void {
    this.collector.accept(condition, this);
  }

  reject(condition: Condition): void {
    this.collector.reject(condition, this);
  }

  mergeResults(state: ValidationState): void {
    this.collector.merge(state.collector);
  }

  clone(mixin: Object = {}): ValidationState {
    const properties: Object = cloneDeepWith(this, value => {
      if (isArray(value)) {
        return value.slice(0);
      }

      if (value !== this) {
        return value;
      }
    });

    return new ValidationState(Object.assign(properties, mixin));
  }

  isEmptyValue(value: any): boolean {
    return some(this.emptyValues, val => val === value);
  }
}
