// @flow

import size from 'lodash/size';

import Condition from '../../Condition';
import isCollection from '../../utils/isCollection';

import type ValidationState from '../../ValidationState';

export default class LengthCondition extends Condition {
  length: number;

  constructor(length: number) {
    super();

    this.length = length;
  }

  validate(value: any, state: ValidationState): boolean {
    if (state.isEmptyValue(value)) {
      return true;
    }

    return isCollection(value) && size(value) === this.length;
  }
}
