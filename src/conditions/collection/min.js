// @flow

import size from 'lodash/size';

import Condition from '../../Condition';
import isCollection from '../../utils/isCollection';

import type ValidationState from '../../ValidationState';

export default class MinCondition extends Condition {
  min: number;

  constructor(min: number) {
    super();

    this.min = min;
  }

  validate(value: any, state: ValidationState): boolean {
    if (state.isEmptyValue(value)) {
      return true;
    }

    return isCollection(value) && size(value) >= this.min;
  }
}
