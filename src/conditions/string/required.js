import isString from 'lodash/isString';
import negate from 'lodash/negate';
import eq from 'lodash/fp/eq';
import overEvery from 'lodash/overEvery';

import RequiredAny from '../any/required';

export default class RequiredString extends RequiredAny {
  constructor() {
    super();

    this.validate = overEvery(isString, negate(eq('')));
  }
};
