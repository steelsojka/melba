// @flow

import Condition from '../../Condition';

import ValidationState from '../../ValidationState';

export default class Default extends Condition {
  defaultValue: any;

  constructor(defaultValue: any) {
    super();

    this.defaultValue = defaultValue;
  }

  sanitize(value: any, state: ValidationState, ...args: any[]): any {
    if (state.isEmptyValue(value)) {
      return this.resolveValue(value, ...args);
    }

    return value;
  }
}
