import assign from 'lodash/assign';
import cloneDeepWith from 'lodash/cloneDeepWith';
import isArray from 'lodash/isArray';
import some from 'lodash/some';

import ResultCollector from './ResultCollector';

export default class ValidationState {
  constructor(state = {}) {
    assign(this, {
      root: null,
      path: [],
      collector: null,
      emptyValues: [null, undefined]
    }, state);

    if (!this.collector) {
      this.collector = new ResultCollector();
    }
  }

  get isValid() {
    return this.collector.rejected.length === 0;
  }

  clone() {
    return new ValidationState(cloneDeepWith(this, value => {
      if (isArray(value)) {
        return value.slice(0);
      }

      if (value !== this) {
        return value;
      }
    }));
  }

  isEmptyValue(value) {
    return some(this.emptyValues, val => val === value);
  }
}
