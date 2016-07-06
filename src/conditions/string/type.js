import isString from 'lodash/isString';

import AnyTypeCheck from '../any/type';

export default class StringTypeCheck extends AnyTypeCheck {
  typeCheck(value) {
    return isString(value);
  }

  sanitize(value, state) {
    if (state.isEmptyValue(value)) {
      return value;
    }

    return toString(value);
  }
};
