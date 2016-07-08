// @flow

import Condition from '../../Condition';
import ResultCollector from '../../ResultCollector';
import type Type from '../../Type';
import type ValidationState from '../../ValidationState';


export default class SomeCondition extends Condition {
  types: Type[];

  constructor(types: Type[]) {
    super();

    this.types = types;
  }

  validate(value: any, state: ValidationState): boolean {
    const results: ValidationState[] = this.types.map(childType => {
      return childType.validate(value, state.clone({ collector: new ResultCollector() }));
    });

    return results.some(result => result.isValid);
  }
}
