// @flow

import Condition from '../../Condition';

import type ValidationState from '../../ValidationState';

export default class AnyTypeCheck extends Condition {
  constructor() {
    super();

    this.priority = 100;
  }

  typeCheck(): boolean {
    return true;
  }

  validate(value: any, state: ValidationState, ...args: any[]): boolean {
    if (state.isEmptyValue(value)) {
      return true;
    }

    return this.typeCheck(value, state, ...args);
  }
};
