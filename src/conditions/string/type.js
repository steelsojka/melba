// @flow

import isString from 'lodash/isString';

import AnyTypeCheck from '../any/type';

import type ValidationState from '../../ValidationState';
import type Type from '../../Type';

export default class StringTypeCheck extends AnyTypeCheck {
  get typeName(): string {
    return 'String';
  }

  typeCheck(value: any): boolean {
    return isString(value);
  }

  convert(value: any, state: ValidationState, type: Type): any {
    if (type.isEmptyValue(value, state)) {
      return value;
    }

    return toString(value);
  }
};
