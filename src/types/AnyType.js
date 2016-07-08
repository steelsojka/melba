// @flow

import Type from '../Type';
import AnyTypeCheck from '../conditions/any/type';

export default Type.createTypeFromCondition('type', AnyTypeCheck);
