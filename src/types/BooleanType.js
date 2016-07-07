// @flow

import Type from '../Type';
import BooleanTypeCheck from '../conditions/boolean/type';

export default class BooleanType extends Type {
  constructor() {
    super();

    this.conditions.set('type', new BooleanTypeCheck());
  }
} 
