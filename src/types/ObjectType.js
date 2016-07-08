// @flow

import forOwn from 'lodash/forOwn';
import get from 'lodash/get';

import AnyType from './AnyType';
import ObjectTypeCheck from '../conditions/object/type';

import type Type from '../Type';
import type Condition from '../Condition';
import type ValidationState from '../ValidationState';

export default class ObjectType extends AnyType {
  schema: {[key: string]: Type};

  constructor(schema: {[key: string]: Type} = {}) {
    super();

    this.conditions.set('type', new ObjectTypeCheck());
    this.schema = schema;
  }

  validate(value: Object, state: ?ValidationState): ValidationState {
    const castState = super.validate(value, state);

    forOwn(this.schema, (type, key) => {
      const childState = castState.clone();

      childState.path.push(key);

      type.validate(get(value, key), childState);
    });

    return castState;
  }
}
