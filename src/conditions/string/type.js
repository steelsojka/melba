// @flow

import isString from 'lodash/isString';

import AnyTypeCheck from '../any/type';

import type ValidationState from '../../ValidationState';
import type { TypeSubClass } from '../../Type';

export default class StringTypeCheck extends AnyTypeCheck {
  get typeName() {
    return 'String';
  }

  typeCheck(value: any): boolean {
    return isString(value);
  }

  convert(value: any, state: ValidationState, type: TypeSubClass): any {
    if (type.isEmptyValue(value, state)) {
      return value;
    }

    return toString(value);
  }
};
