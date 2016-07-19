// @flow

import size from 'lodash/size';

import Condition from '../../Condition';
import isCollection from '../../utils/isCollection';

import type ValidationState from '../../ValidationState';
import type Type from '../../Type';

export default class LengthCondition extends Condition {
  length: number;

  constructor(length: number) {
    super();

    this.length = length;
  }

  validate(value: any, state: ValidationState, type: Type): Error|void {
    if (type.isEmptyValue(value, state)) {
      return;
    }

    if (!(isCollection(value) && size(value) === this.length)) {
      return this.reject(`Value must be of size ${this.length}`, state);
    }
  }
}
