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

  merge(collector: ResultCollector): void {
    collector.accepted.forEach((entry: ConditionResult) => this.accepted.push(entry));
    collector.rejected.forEach((entry: ConditionResult) => this.rejected.push(entry));
  }
}
