// @flow

import isString from 'lodash/isString';

import RequiredAny from '../any/required';

export default class RequiredString extends RequiredAny {
  validate(value: any, ...args: any[]): boolean {
    return isString(value) && value.length > 0;
  }
};
