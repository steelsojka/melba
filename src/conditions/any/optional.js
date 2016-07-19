// @flow

import Condition from '../../Condition';

import type { TypeSubClass } from '../../Type';

export default class OptionalAny extends Condition {
  install(name: string, type: TypeSubClass): void {
    type.conditions.delete('required');
  }
};
