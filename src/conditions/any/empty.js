// @flow

import Condition from '../../Condition';
import type ValidationState from '../../ValidationState';

export default class EmptyCondition extends Condition {
  value: any;

  constructor(value: any) {
    super();

    Object.assign(this, { value });
  }
  
  modifyState(state: ValidationState): void {
    state._emptyValues.push(this.value);
  }
}
