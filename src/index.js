// @flow

import Skima from './Skima';

// ************ Types *************
import ObjectType from './types/ObjectType';
import StringType from './types/StringType';
import AnyType from './types/AnyType';
import BooleanType from './types/BooleanType';
import ArrayType from './types/ArrayType';

// ******** Conditions ************ 

// Any
import RequiredAny from './conditions/any/required';
import DefaultAny from './conditions/any/default';

// String
import RequiredString from './conditions/string/required';

// Object
import RequiredObject from './conditions/object/required';

// Boolean
import RequiredBoolean from './conditions/boolean/required';

// Array
import RequiredArray from './conditions/array/required';

// Register all conditions
AnyType.registerAll({
  required: RequiredAny,
  default: DefaultAny
});

StringType.registerAll({
  required: RequiredString
});

ObjectType.registerAll({
  required: RequiredObject
});

BooleanType.registerAll({
  required: RequiredBoolean
});

ArrayType.registerAll({
  required: RequiredArray
});

// Register the types

export default new Skima({
  object: ObjectType,
  string: StringType,
  any: AnyType,
  boolean: BooleanType,
  array: ArrayType
});
