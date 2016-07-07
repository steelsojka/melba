import Type from '../Type';
import ArrayTypeCheck from '../conditions/array/type';

export default class ArrayType extends Type {
  static get typeCondition() {
    return ArrayTypeCheck;
  }
} 
