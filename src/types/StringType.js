// @flow

import AnyType from './AnyType';
import StringTypeCheck from '../conditions/string/type';

export default AnyType.createTypeFromCondition('type', StringTypeCheck);
