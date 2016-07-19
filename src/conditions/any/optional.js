// @flow

import Condition from '../../Condition';

import type Type from '../../Type';

export default class OptionalAny extends Condition {
  install(name: string, type: Type): void {
    type._conditions.delete('required');
  }
};
