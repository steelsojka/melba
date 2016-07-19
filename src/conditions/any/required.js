// @flow

import Condition from '../../Condition';

import type ValidationState from '../../ValidationState';
import type { TypeSubClass } from '../../Type';

export default class RequiredAny extends Condition {
  constructor() {
    super();

    this.priority = 20;
  }

  validate(value: any, state: ValidationState, type: TypeSubClass): Error|void {
    if (type.isEmptyValue(value, state)) {
      return this.reject('Field is required', state);
    }
  }
};
