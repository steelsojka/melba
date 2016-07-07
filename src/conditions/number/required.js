// @flow

import isFinite from 'lodash/isFinite';

import RequiredAny from '../any/required';

export default class RequiredNumber extends RequiredAny {
  validate(value: mixed): boolean {
    return isFinite(value);
  }
}
