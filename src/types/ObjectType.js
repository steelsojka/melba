// @flow

import forOwn from 'lodash/forOwn';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import last from 'lodash/last';
import set from 'lodash/set';

import AnyType from './AnyType';
import ObjectTypeCheck from '../conditions/object/type';
import ValidationState from '../ValidationState';

import type Type from '../Type';
import type Condition from '../Condition';

export default class ObjectType extends AnyType {
  schema: {[key: string]: Type};

  constructor(schema: {[key: string]: Type} = {}) {
    super();

    this.conditions.set('type', new ObjectTypeCheck());
    this.schema = schema;
  }

  validate(value: Object, state: ?ValidationState): ValidationState {
    const castState = super.validate(value, state);

    if (!isObject(value)) {
      castState.reject(this);

      return castState;
    }

    this.forEachType(value, castState, (type, pathValue, childState) => {
      type.validate(pathValue, childState);
    });

    return castState;
  }

  sanitize(value: Object, state: ?ValidationState): ValidationState {
    const castState = super.sanitize(value, state);

    castState.sanitized = {};

    this.forEachType(value, castState, (type, pathValue, childState) => {
      const { sanitized } = type.sanitize(pathValue, childState);

      set(castState.sanitized, last(childState.path), sanitized);
    });

    return castState;
  }

  forEachType(container: Object, state: ValidationState, iterator: Function): void {
    forOwn(this.schema, (type, key) => {
      const childState = state.clone({ container });

      childState.path.push(key);

      iterator(type, get(container, key), childState);
    });
  }
}
