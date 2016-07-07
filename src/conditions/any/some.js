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

    for (let result of results) {
      if (result.isValid) {
        state.accept(this);
        state.mergeResults(result);

        return true;
      }
    }

    state.reject(this);

    return false;
  }
}
