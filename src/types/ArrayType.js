// @flow

import Type from '../Type';
import ArrayTypeCheck from '../conditions/array/type';

export default class ArrayType extends Type {
  constructor() {
    super();

    this.conditions.set('type', new ArrayTypeCheck());
  }
} 
