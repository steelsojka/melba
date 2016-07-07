// @flow

import forOwn from 'lodash/forOwn';
import get from 'lodash/get';

import Type from '../Type';
import ObjectTypeCheck from '../conditions/object/type';

import type Condition from '../Condition';
import type ValidationState from '../ValidationState';

export default class ObjectType extends Type {
  schema: {[key: string]: Type|Condition};

  constructor(schema: {[key: string]: Type|Condition} = {}) {
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
