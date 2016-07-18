import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import AnyTypeCheck from '../any/type';

import type ValidationState from '../../ValidationState';

export default class ArrayTypeCheck extends AnyTypeCheck {
  typeCheck(value: any): boolean {
    return isArray(value);
  }

  convert(value: any, state: ValidationState): any {
    if (state.isEmptyValue(value)) {
      return value;
    }

    if (isObject(value) && value[Symbol.iterator]) {
      return [...value];
    }

    return this.castFailError(value, 'Array', state);
  }
};
