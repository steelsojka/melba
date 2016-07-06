import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import AnyTypeCheck from '../any/type';

export default class ObjectTypeCheck extends AnyTypeCheck {
  typeCheck(value) {
    return isObject(value) && !isArray(value);
  }

  sanitize(value, state) {
    if (state.isEmptyValue(value)) {
      return value;
    }

    if (!this.typeCheck(value)) {
      state.collector.reject(this, state);
    }

    return value;
  }
};
