import AnyType from './AnyType';
import StringTypeCheck from '../conditions/string/type';

export default class StringType extends AnyType {
  static get typeCondition() {
    return StringTypeCheck;
  }
}
