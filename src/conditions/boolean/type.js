// @flow

import isBoolean from 'lodash/isBoolean';

import AnyTypeCheck from '../any/type';

import type ValidationState from '../../ValidationState';
import type { TypeSubClass } from '../../Type';

export default class BooleanTypeCheck extends AnyTypeCheck {
  typeCheck(value: any): boolean {
    return isBoolean(value);
  }

  convert(value: any, state: ValidationState, type: TypeSubClass): any {
    if (type.isEmptyValue(value, state)) {
      return value;
    }

    if (value === 1 || value === 'true' || value === true) {
      return true;
    }

    if (value === 0 || value === 'false' || value === false) {
      return false;
    }

    return this.castFailError(value, 'Boolean', state);
  }
}
