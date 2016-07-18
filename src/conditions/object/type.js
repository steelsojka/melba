// @flow

import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import AnyTypeCheck from '../any/type';

import type ValidationState from '../../ValidationState';

export default class ObjectTypeCheck extends AnyTypeCheck {
  typeCheck(value: mixed): boolean {
    return isObject(value) && !isArray(value);
  }

  convert(value: any, state: ValidationState): any {
    if (state.isEmptyValue(value)) {
      return value;
    }

    if (!this.typeCheck(value)) {
      return this.castFailError(value, 'Object', state);
    }

    return value;
  }
};
