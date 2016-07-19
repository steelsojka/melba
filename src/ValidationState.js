// @flow

import assign from 'lodash/assign';
import clone from 'lodash/clone';
import isArray from 'lodash/isArray';
import some from 'lodash/some';

import ResultCollector from './ResultCollector';

import type Condition from './Condition';
import type ValidationError from './ValidationError';

export default class ValidationState {
  result: any;
  convert: boolean;
  abortEarly: boolean;
  _context: Object;
  _value: any;
  _path: string[];
  _container: ?Object;
  _collector: ResultCollector;
  _emptyValues: any[];

  constructor(state: ?Object = {}) {
    assign(this, {
      result: null,
      convert: true,
      abortEarly: true,
      _context: {},
      _path: [],
      _value: null,
      _collector: null,
      _emptyValues: []
    }, state);

    if (!this._collector) {
      this._collector = new ResultCollector();
    }
  }

  get isValid(): boolean {
    return this._collector.rejected.length === 0;
  }

  get errors(): ValidationError[] {
    return this._collector.rejected.map(res => res.error);
  }

  accept(condition: Condition): void {
    this._collector.accept(condition, this);
  }

  reject(condition: Condition, error: Error): void {
    this._collector.reject(condition, this, error);
  }

  mergeResults(state: ValidationState): void {
    this._collector.merge(state._collector);
  }

  clone(mixin: Object = {}): ValidationState {
    const properties = {
      result: this.result,
      convert: this.convert,
      abortEarly: this.abortEarly,
      _context: this._context,
      _path: clone(this._path),
      _value: this._value,
      _collector: this._collector,
      _emptyValues: this._emptyValues.slice(0)
    };

    return new ValidationState(Object.assign(properties, mixin));
  }

  spawn() {
    return this.clone({
      _collector: new ResultCollector(),
      _emptyValues: []
    });
  }
}
