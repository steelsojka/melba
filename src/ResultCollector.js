// @flow

import assign from 'lodash/assign';
import ConditionResult from './ConditionResult';

import type Condition from './Condition';
import type ValidationState from './ValidationState';

export default class ResultCollector {
  accepted: ConditionResult[];
  rejected: ConditionResult[];

  constructor() {
    assign(this, {
      accepted: [],
      rejected: []
    });
  }

  reject(condition: Condition, state: ValidationState): void {
    this.rejected.push(new ConditionResult(condition, state));
  }

  accept(condition: Condition, state: ValidationState): void {
    this.accepted.push(new ConditionResult(condition, state));
  }
}
