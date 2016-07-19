// @flow

import Condition from '../../Condition';

import type ValidationState from '../../ValidationState';
import type { TypeSubClass } from '../../Type';

export default class Default extends Condition {
  defaultValue: any;

  constructor(defaultValue: any) {
    super();

    this.defaultValue = defaultValue;
  }

  convert(value: any, state: ValidationState, type: TypeSubClass): any {
    if (type.isEmptyValue(value, state)) {
      return this.resolveValue(this.defaultValue);
    }

    return value;
  }
}
