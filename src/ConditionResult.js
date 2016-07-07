// @flow

import type Condition from './Condition';
import type ValidationState from './ValidationState';

export default class ConditionResult {
  condition: Condition;
  state: ValidationState;

  constructor(condition: Condition, state: ValidationState) {
    Object.assign(this, { condition, state });
  }
}
