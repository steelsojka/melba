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

  validate(value: any, state: ValidationState): boolean {
    if (state.isEmptyValue(value)) {
      return true;
    }

    return isCollection(value) && size(value) <= this.max;
  }
}
