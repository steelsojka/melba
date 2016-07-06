import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

import RequiredAny from '../any/required';

export default class RequiredObject extends RequiredAny {
  validate(value) {
    return isObject(value) && !isArray(value);
  }
};
