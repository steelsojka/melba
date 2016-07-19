// @flow

import assign from 'lodash/assign';

// ************ Types *************
import Type from './Type';
import ObjectType from './types/ObjectType';
import StringType from './types/StringType';
import AnyType from './types/AnyType';
import BooleanType from './types/BooleanType';
import ArrayType from './types/ArrayType';
import NumberType from './types/NumberType';

// ******** Conditions ************ 

import DefaultAny from './conditions/any/default';

import * as anyConditions from './conditions/any';
import * as stringConditions from './conditions/string';
import * as objectConditions from './conditions/object';
import * as booleanConditions from './conditions/boolean';
import * as arrayConditions from './conditions/array';
import * as numberConditions from './conditions/number';
import * as collectionConditions from './conditions/collection';

// Register all conditions
AnyType.extend(assign({
  default: DefaultAny
}, anyConditions));

StringType.extend(assign({}, stringConditions, collectionConditions));
ObjectType.extend(assign({}, objectConditions, collectionConditions));
ArrayType.extend(assign({}, arrayConditions, collectionConditions));
BooleanType.extend(booleanConditions);
NumberType.extend(numberConditions);

const any = new AnyType();

// Register the types
export default assign(any, {
  any: createType(AnyType),
  object: createType(ObjectType),
  string: createType(StringType),
  array: createType(ArrayType),
  number: createType(NumberType),
  boolean: createType(BooleanType),
});

function createType(TypeCtor) {
  return function(...args) {
    return new TypeCtor(...args);
  };
}
