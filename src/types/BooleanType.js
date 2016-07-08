// @flow

import AnyType from './AnyType';
import BooleanTypeCheck from '../conditions/boolean/type';

export default AnyType.createTypeFromCondition('type', BooleanTypeCheck);
