import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

import RequiredAny from '../any/required';

export default class RequiredObject extends RequiredAny {
  validate(value) {
    return isObject(value) && !isArray(value);
  }

  sanitize(value, state) {
    if (!this.validate(value)) {
      state.collector.reject(this, state);
    }

    return value;
  }
};
