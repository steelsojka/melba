// @flow

import Condition from '../../Condition';

import type ValidationState from '../../ValidationState';
import type Type from '../../Type';

export default class RequiredAny extends Condition {
  constructor() {
    super();

    this.priority = 20;
  }

  validate(value: any, state: ValidationState, type: Type): Error|void {
    if (type.isEmptyValue(value, state)) {
      return this.reject('Field is required', state);
    }
  }
};
