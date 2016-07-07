// @flow

import Type from '../Type';
import AnyTypeCheck from '../conditions/any/type';

export default class AnyType extends Type {
  constructor() {
    super();

    this.conditions.set('type', new AnyTypeCheck());
  }
}
