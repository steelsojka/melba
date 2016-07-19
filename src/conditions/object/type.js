// @flow

import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import AnyTypeCheck from '../any/type';

import type ValidationState from '../../ValidationState';
import type { TypeSubClass } from '../../Type';

export default class ObjectTypeCheck extends AnyTypeCheck {
  typeCheck(value: mixed): boolean {
    return isObject(value) && !isArray(value);
  }

  convert(value: any, state: ValidationState, type: TypeSubClass): any {
    if (type.isEmptyValue(value, state)) {
      return value;
    }

    if (!this.typeCheck(value)) {
      return this.castFailError(value, 'Object', state);
    }

    return value;
  }
};
