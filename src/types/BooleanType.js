import Type from '../Type';
import BooleanTypeCheck from '../conditions/boolean/type';

export default class BooleanType extends Type {
  static get typeCondition() {
    return BooleanTypeCheck;
  }
} 
