// @flow

import isString from 'lodash/isString';

import AnyTypeCheck from '../any/type';

import type ValidationState from '../../ValidationState';

export default class StringTypeCheck extends AnyTypeCheck {
  typeCheck(value: any): boolean {
    return isString(value);
  }

  sanitize(value: any, state: ValidationState): any {
    if (state.isEmptyValue(value)) {
      return value;
    }

    return toString(value);
  }
};
