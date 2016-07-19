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
  _schema: {[key: string]: Type};

  constructor(schema: {[key: string]: Type} = {}) {
    super();

    this._conditions.set('type', new ObjectTypeCheck());
    this._schema = schema;
  }

  validate(value: Object, state: ?ValidationState): ValidationState {
    const castState = super.validate(value, state);

    castState.result = {};

    forOwn(this._schema, (type, key) => {
      const childState = castState.clone({ container: value });

      childState._path.push(key);

      const { result } = type.validate(get(value, key), childState);

      set(castState.result, key, result);
    });

    return castState;
  }
}
