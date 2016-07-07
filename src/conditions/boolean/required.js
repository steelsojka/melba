// @flow

import isBoolean from 'lodash/isBoolean';

import RequiredAny from '../any/required';

export default class RequiredBoolean extends RequiredAny {
  validate(value: any): boolean {
    return isBoolean(value);
  }
};
