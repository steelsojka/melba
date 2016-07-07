import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import AnyTypeCheck from '../any/type';

import type ValidationState from '../../ValidationState';

export default class ArrayTypeCheck extends AnyTypeCheck {
  typeCheck(value: any): boolean {
    return isArray(value);
  }

  sanitize(value: any, state: ValidationState): any {
    if (state.isEmptyValue(value)) {
      return value;
    }

    if (isObject(value) && value[Symbol.iterator]) {
      return [...value];
    }

    state.collector.reject(this, state);

    return value;
  }
};
