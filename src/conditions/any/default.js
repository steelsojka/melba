// @flow

import Condition from '../../Condition';

import type ValidationState from '../../ValidationState';
import type Type from '../../Type';

export default class Default extends Condition {
  defaultValue: any;

  constructor(defaultValue: any) {
    super();

    this.defaultValue = defaultValue;
  }

  convert(value: any, state: ValidationState, type: Type): any {
    if (type.isEmptyValue(value, state)) {
      return this.resolveValue(this.defaultValue);
    }

    return value;
  }
}
