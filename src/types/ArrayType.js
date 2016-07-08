// @flow

import AnyType from './AnyType';
import ArrayTypeCheck from '../conditions/array/type';

export default AnyType.createTypeFromCondition('type', ArrayTypeCheck);
