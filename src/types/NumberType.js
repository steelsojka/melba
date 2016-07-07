// @flow

import Type from '../Type';
import NumberTypeCheck from '../conditions/number/type';

export default class NumberType extends Type {
  constructor() {
    super();

    this.conditions.set('type', new NumberTypeCheck());
  }
} 
