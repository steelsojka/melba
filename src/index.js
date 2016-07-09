// @flow

import Skima from './Skima';

// ************ Types *************
import Type from './Type';
import ObjectType from './types/ObjectType';
import StringType from './types/StringType';
import AnyType from './types/AnyType';
import BooleanType from './types/BooleanType';
import ArrayType from './types/ArrayType';
import NumberType from './types/NumberType';

// ******** Conditions ************ 

// Any
import DefaultAny from './conditions/any/default';
import SomeAny from './conditions/any/some';
import WhenAny from './conditions/any/when';
import EveryAny from './conditions/any/every';
import RequiredAny from './conditions/any/required';

import * as anyConditions from './conditions/any';
import * as stringConditions from './conditions/string';
import * as objectConditions from './conditions/object';
import * as booleanConditions from './conditions/boolean';
import * as arrayConditions from './conditions/array';
import * as numberConditions from './conditions/number';

// Register all conditions
AnyType.registerAll(anyConditions);

AnyType.register({
  default: DefaultAny
});

StringType.registerAll(stringConditions);
ObjectType.registerAll(objectConditions);
BooleanType.registerAll(booleanConditions);
ArrayType.registerAll(arrayConditions);
NumberType.registerAll(numberConditions);

// Register the types

export default new Skima({
  object: ObjectType,
  string: StringType,
  any: AnyType,
  boolean: BooleanType,
  array: ArrayType,
  number: NumberType,
  some: AnyType.createTypeFromCondition('some', SomeAny),
  when: AnyType.createTypeFromCondition('when', WhenAny),
  every: AnyType.createTypeFromCondition('every', EveryAny),
  required: AnyType.createTypeFromCondition('required', RequiredAny)
});
