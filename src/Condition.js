// @flow

import defaults from 'lodash/defaults';
import isFunction from 'lodash/isFunction';

import ValidationError from './ValidationError';
import type Type from './Type';
import type ValidationState from './ValidationState';
export type ConditionSubClass = Class<$Subtype<Condition>>;

export default class Condition {
  priority: number;
  multiples: boolean;

  constructor() {
    defaults(this, {
      priority: 0,
      multiples: false
    });
  }

  validate(value: any, state: ValidationState, type: Type): Error|void {}

  coerce(value: any, state: ValidationState, type: Type): any {
    return value;
  }

  convert(value: any, state: ValidationState, type: Type): any {
    return value;
  }

  install(name: string, initType: Type): void {
    initType._conditions.set(name, this);
  }

  getReturnValue(type: Type): any {
    return type;
  }

  resolveValue(value: any, ...args: any[]): any {
    if (isFunction(value)) {
      return value(...args);
    }

    return value;
  }

  reject(message: string, state: ValidationState): ValidationError {
    return new ValidationError(message, state);
  }

  modifyState(state: ValidationState, value: any, type: Type): void {}
}
