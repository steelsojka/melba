// @flow

import Condition from '../../Condition';

import type ValidationState from '../../ValidationState';

export default class RequiredAny extends Condition {
  constructor() {
    super();

    this.priority = 20;
  }

  validate(value: any, state: ValidationState): boolean {
    return !state.isEmptyValue(value);
  }
};
