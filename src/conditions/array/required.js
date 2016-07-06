import isArray from 'lodash/isArray';
import castArray from 'lodash/castArray';

import RequiredAny from '../any/required';

export default class RequiredArray extends RequiredAny {
  validate(value) {
    return isArray(value);
  }
};
