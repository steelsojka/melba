// @flow

import isBoolean from 'lodash/isBoolean';

import AnyTypeCheck from '../any/type';

import type ValidationState from '../../ValidationState';

export default class BooleanTypeCheck extends AnyTypeCheck {
  typeCheck(value: any): boolean {
    return isBoolean(value);
  }

  sanitize(value: any, state: ValidationState): any {
    if (state.isEmptyValue(value)) {
      return value;
    }

    if (value === 1 || value === 'true' || value === true) {
      return true;
    }

    if (value === 0 || value === 'false' || value === false) {
      return false;
    }

    state.reject(this, state);

    return value;
  }
}
