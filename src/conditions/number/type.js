// @flow

import isFinite from 'lodash/isFinite';
import toNumber from 'lodash/toNumber';

import AnyTypeCheck from '../any/type';

import type ValidationState from '../../ValidationState';
import type { TypeSubClass } from '../../Type';

export default class NumberTypeCheck extends AnyTypeCheck {
  typeCheck(value: mixed): boolean {
    return isFinite(value);
  }

  convert(value: any, state: ValidationState, type: TypeSubClass): any {
    if (type.isEmptyValue(value, state)) {
      return value;
    }

    const converted = parseFloat(value);

    if (!isFinite(converted)) {
      return this.castFailError(value, 'Number', state);
    }

    return converted;
  }
}
