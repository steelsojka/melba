// @flow

import AnyType from './AnyType';
import NumberTypeCheck from '../conditions/number/type';

export default AnyType.createTypeFromCondition('type', NumberTypeCheck);
