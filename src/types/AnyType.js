import Type from '../Type';
import AnyTypeCheck from '../conditions/any/type';

export default class AnyType extends Type {
  static get typeCondition() {
    return AnyTypeCheck;
  }
}
