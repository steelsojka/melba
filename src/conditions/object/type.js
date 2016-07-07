// @flow

import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import AnyTypeCheck from '../any/type';

import type ValidationState from '../../ValidationState';

export default class ObjectTypeCheck extends AnyTypeCheck {
  typeCheck(value: mixed): boolean {
    return isObject(value) && !isArray(value);
  }

  sanitize(value: any, state: ValidationState): mixed {
    if (state.isEmptyValue(value)) {
      return value;
    }

    if (!this.typeCheck(value)) {
      state.reject(this, state);
    }

    return value;
  }
};
