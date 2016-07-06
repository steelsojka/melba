import isArray from 'lodash/isArray';

import RequiredAny from '../any/required';

export default class RequiredArray extends RequiredAny {
  constructor() {
    super();

    this.validate = isArray;
  }
};
