// @flow

import Condition from '../../Condition';

import type ValidationState from '../../ValidationState';
import type ValidationError from '../../ValidationError';

export default class AnyTypeCheck extends Condition {
  constructor() {
    super();

    this.priority = 100;
  }

  typeCheck(): boolean {
    return true;
  }

  castFailError(value: any, type: string, state: ValidationState): ValidationError {
    return this.reject(`Can not cast value ${value} to type`, state);
  }

  validate(value: any, state: ValidationState, ...args: any[]): boolean {
    if (state.isEmptyValue(value)) {
      return true;
    }

    return this.typeCheck(value, state, ...args);
  }
};
