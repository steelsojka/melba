// @flow

import size from 'lodash/size';

import Condition from '../../Condition';
import isCollection from '../../utils/isCollection';

import type ValidationState from '../../ValidationState';

export default class MaxCondition extends Condition {
  max: number;

  constructor(max: number) {
    super();

    this.max = max;
  }

  validate(value: any, state: ValidationState): Error|void {
    if (state.isEmptyValue(value)) {
      return;
    }

    if (!(isCollection(value) && size(value) <= this.max)) {
      return this.reject(`Value must have a size less than ${this.max}`, state);
    }
  }
}
