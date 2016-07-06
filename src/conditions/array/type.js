import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import AnyTypeCheck from '../any/type';

export default class ArrayTypeCheck extends AnyTypeCheck {
  typeCheck(value) {
    return isArray(value);
  }

  sanitize(value, state) {
    if (state.isEmptyValue(value)) {
      return value;
    }

    if (isObject(value) && value[Symbol.iterator]) {
      return [...value];
    }

    state.collector.reject(this, state);

    return value;
  }
};
