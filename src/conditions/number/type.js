// @flow

import isFinite from 'lodash/isFinite';
import toNumber from 'lodash/toNumber';

import AnyTypeCheck from '../any/type';

import type ValidationState from '../../ValidationState';

export default class NumberTypeCheck extends AnyTypeCheck {
  typeCheck(value: mixed): boolean {
    return isFinite(value);
  }

  sanitize(value: mixed, state: ValidationState): mixed {
    if (state.isEmptyValue(value)) {
      return value;
    }

    const converted = parseFloat(value);

    if (!isFinite(converted)) {
      state.collector.reject(this, state);

      return value;
    }

    return converted;
  }
}
