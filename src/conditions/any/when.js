// @flow

import Condition from '../../Condition';
import PathParser from '../../PathParser';
import ResultCollector from '../../ResultCollector';

import type Type from '../../Type';
import type ValidationState from '../../ValidationState';

export default class When extends Condition {
  pathParser: PathParser;
  typePairs: Array<Array<Type|Function>>;

  constructor(path: string|string[], typePairs: Array<Array<Type|Function>>) {
    super();

    Object.assign(this, {
      typePairs,
      pathParser: new PathParser(path),
    });
  }

  validate(value: any, state: ValidationState): boolean {
    const lhsVal = this.pathParser.getFromState(state);

    for (let [lhsType, rhsType] of this.typePairs) {
      if (this.resolveType(lhsType, lhsVal, state)) {
        rhsType.isValid(value, state.clone());
        break;
      }
    }

    return true;
  }

  resolveType(pairType: Type|Function, value: any, state: ValidationState): boolean {
    const clonedState = state.clone({ collector: new ResultCollector() });

    if (typeof pairType === 'function') {
      return pairType(value, clonedState);
    }

    return pairType.isValid(value, clonedState);
  }
}
