// @flow

import sortBy from 'lodash/sortBy';
import forOwn from 'lodash/forOwn';
import assign from 'lodash/assign';
import cloneDeepWith from 'lodash/cloneDeepWith';
import some from 'lodash/some';

import ConditionMap from './ConditionMap';
import ValidationState from './ValidationState';
import Condition from './Condition';
import ValidationError from './ValidationError';

import type { ConditionSubClass } from './Condition';

type ConditionEntry = {
  name: string;
  condition: Condition;
};

export type TypeSubClass = Class<$Subtype<Type>>;

export default class Type {
  _conditions: ConditionMap;

  constructor() {
    Object.assign(this, {
      _conditions: new ConditionMap()
    });
  }

  validate(value: any, state: ?ValidationState): ValidationState {
    let lastValidValue = value;
    let nextValue = value;
    let castState = this.castState(value, state);

    const conditions = this.getConditionChain();

    for (let { name, condition } of conditions) {
      condition.modifyState(castState, value, this);
    }

    for (let { name, condition } of conditions) {
      let validationResult;
      let isValid = true;

      const coercedValue = condition.coerce(nextValue, castState, this);

      if (coercedValue instanceof Error) {
        castState.reject(condition, coercedValue);
        isValid = false;
      }

      if (isValid) {
        validationResult = condition.validate(coercedValue, castState, this);

        if (validationResult instanceof Error) {
          castState.reject(condition, validationResult);
          isValid = false;
        }
      }

      if (isValid && castState.convert) {
        nextValue = condition.convert(coercedValue, castState, this);

        if (coercedValue instanceof Error) {
          castState.reject(condition, coercedValue);
          nextValue = lastValidValue;
          isValid = false;
        }
      }

      if (!isValid && castState.abortEarly) {
        break;
      }

      lastValidValue = nextValue;
    }

    castState.result = lastValidValue;

    return castState;
  }

  getConditionChain(): ConditionEntry[]  {
    const result = [];

    for (let [name, condition] of this._conditions.iterate()) {
      result.push({ name, condition });
    }

    return sortBy(result, 'condition.priority');
  }

  castState(value: any, state: ?ValidationState): ValidationState  {
    if (!(state instanceof ValidationState)) {
      state = new ValidationState(state);
    }

    return Object.assign(state, { _value: value });
  }

  isValid(value: any, state: ?ValidationState): boolean {
    return this.validate(value, state).isValid;
  }

  clone(): Type {
    const props = cloneDeepWith(this, value => {
      if (Array.isArray(value)) {
        return value.slice(0);
      }

      if (value instanceof ConditionMap) {
        return value.clone();
      }

      if (value !== this) {
        return value;
      }
    });

    return assign(new this.constructor(), props);
  }

  isEmptyValue(value: any, state: ValidationState): boolean {
    if (value === undefined) {
      return true;
    }

    return some(state._emptyValues, val => {
      return val instanceof Type ? val.isValid(value, state.spawn()) : val === value;
    });
  }

  static extend(conditions: {[key: string]: ConditionSubClass}) {
    const proto: Object = this.prototype;

    forOwn(conditions, (ConditionCtor, name) => {
      proto[name] = this.getApiFactory(name, ConditionCtor);
    });
  }

  static getApiFactory(name: string, ConditionCtor: ConditionSubClass): Function {
    return function apiFactory(...args: any[]): any {
      const newType = this.clone();
      const condition = new ConditionCtor(...args);

      condition.install(name, newType);

      return condition.getReturnValue(newType);
    }
  }

  static createTypeFromCondition(name: string, ConditionCtor: ConditionSubClass): TypeSubClass {
    return class extends this {
      constructor(...args: any[]) {
        super(...args);

        const condition = new ConditionCtor(...args);

        condition.install(name, this);
      }
    }
  }
}
