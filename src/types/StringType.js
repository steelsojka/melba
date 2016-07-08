// @flow

import AnyType from './AnyType';
import StringTypeCheck from '../conditions/string/type';

export default class StringType extends AnyType {
  constructor() {
    super();

    this.conditions.set('type', new StringTypeCheck());
  }
} 
