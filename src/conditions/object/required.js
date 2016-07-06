import isObject from 'lodash/isObject';

import RequiredAny from '../any/required';

export default class RequiredObject extends RequiredAny {
  constructor() {
    super();

    this.validate = isObject;
  }
};
