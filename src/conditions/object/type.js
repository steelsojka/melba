import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import AnyTypeCheck from '../any/type';

export default class ObjectTypeCheck extends AnyTypeCheck {
  typeCheck(value) {
    return isObject(value) && !isArray(value);
  }
};
