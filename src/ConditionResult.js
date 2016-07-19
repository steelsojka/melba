// @flow

import type Condition from './Condition';
import type ValidationState from './ValidationState';

export default class ConditionResult {
  condition: Condition;
  state: ValidationState;
  error: ?Error;

  constructor(condition: Condition, state: ValidationState, error: ?Error) {
    Object.assign(this, { condition, state, error });
  }
}
