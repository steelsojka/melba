// @flow

import AnyType from './AnyType';
import NumberTypeCheck from '../conditions/number/type';

export default class NumberType extends AnyType {
  constructor() {
    super();

    this.conditions.set('type', new NumberTypeCheck());
  }
} 
