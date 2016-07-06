import isArray from 'lodash/isArray';

import AnyTypeCheck from '../any/type';

export default class ArrayTypeCheck extends AnyTypeCheck {
  typeCheck(value) {
    return isArray(value);
  }
};
