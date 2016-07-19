// @flow

import size from 'lodash/size';

import Condition from '../../Condition';
import isCollection from '../../utils/isCollection';

import type ValidationState from '../../ValidationState';
import type Type from '../../Type';

export default class MinCondition extends Condition {
  min: number;

  constructor(min: number) {
    super();

    this.min = min;
  }

  validate(value: any, state: ValidationState, type: Type): Error|void {
    if (type.isEmptyValue(value, state)) {
      return;
    }

    if (!(isCollection(value) && size(value) >= this.min)) {
      return this.reject(`Value must be greater than ${this.min}`, state);
    }
  }
}
