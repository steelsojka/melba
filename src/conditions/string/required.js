import isString from 'lodash/isString';
import toString from 'lodash/toString';

import RequiredAny from '../any/required';

export default class RequiredString extends RequiredAny {
  validate(value, ...args) {
    return isString(value) && value.length > 0;
  }

  sanitize(value) {
    return toString(value);
  }
};
