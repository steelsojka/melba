// @flow

import Condition from '../../Condition';
import ResultCollector from '../../ResultCollector';
import type { TypeSubClass } from '../../Type';
import type ValidationState from '../../ValidationState';

export default class SomeCondition extends Condition {
  types: TypeSubClass[];

  constructor(types: Type[]) {
    super();

    Object.assign(this, {
      types,
      multiples: true
    });
  }

  validate(value: any, state: ValidationState): Error|void {
    const results: ValidationState[] = this.types.map(childType => {
      return childType.validate(value, state.clone({ collector: new ResultCollector() }));
    });

    if(!results.some(result => result.isValid)) {
      return this.reject('Value did not satisfy any condition.', state);
    }
  }
}
