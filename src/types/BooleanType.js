// @flow

import AnyType from './AnyType';
import BooleanTypeCheck from '../conditions/boolean/type';

export default class BooleanType extends AnyType {
  constructor() {
    super();

    this.conditions.set('type', new BooleanTypeCheck());
  }
} 
