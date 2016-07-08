// @flow

import AnyType from './AnyType';
import ArrayTypeCheck from '../conditions/array/type';

export default class ArrayType extends AnyType {
  constructor() {
    super();

    this.conditions.set('type', new ArrayTypeCheck());
  }
} 
