import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import AnyTypeCheck from '../any/type';

import type ValidationState from '../../ValidationState';
import type { TypeSubClass } from '../../Type';

export default class ArrayTypeCheck extends AnyTypeCheck {
  typeCheck(value: any): boolean {
    return isArray(value);
  }

  convert(value: any, state: ValidationState, type: TypeSubClass): any {
    if (type.isEmptyValue(value, state)) {
      return value;
    }

    if (isObject(value) && value[Symbol.iterator]) {
      return [...value];
    }

    return this.castFailError(value, 'Array', state);
  }
};
