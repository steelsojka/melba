import defaults from 'lodash/defaults';
import isFunction from 'lodash/isFunction';

export default class Condition {
  constructor() {
    defaults(this, {
      priority: 0
    });
  }

  validate() {
    return true;
  }

  sanitize(value) {
    return value;
  }

  getReturnValue(type) {
    return type;
  }

  resolveValue(value, ...args) {
    if (isFunction(value)) {
      return value(...args);
    }

    return value;
  }

  modifyState() {}
}
