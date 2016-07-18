// @flow

import sortBy from 'lodash/sortBy';
import forOwn from 'lodash/forOwn';
import assign from 'lodash/assign';
import cloneDeepWith from 'lodash/cloneDeepWith';

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
  conditions: ConditionMap;

  constructor() {
    Object.assign(this, {
      conditions: new ConditionMap()
    });
  }

  validate(value: any, state: ?ValidationState): ValidationState {
    let lastValidValue = value;
    let coercedValue = value;
    let castState = this.castState(value, state);

    const conditions = this.getConditionChain();

    for (let { name, condition } of conditions) {
      condition.modifyState(castState, value, this);
    }

    for (let { name, condition } of conditions) {
      let validationResult;
      let isValid = true;

      if (castState.convert) {
        coercedValue = condition.convert(coercedValue, castState);

        if (coercedValue instanceof ValidationError) {
          coercedValue = lastValidValue;
          isValid = false;
          castState.reject(condition, castState, coercedValue);
        }
      }

      if (isValid) {
        validationResult = condition.validate(coercedValue, castState, this);

        if (validationResult instanceof ValidationError) {
          isValid = false;
          castState.reject(condition, castState, validationResult);
        }
      }

      if (!isValid && castState.abortEarly) {
        break;
      }

      lastValidValue = coercedValue;
    }

    castState.result = lastValidValue;

    return castState;
  }

  getConditionChain(): ConditionEntry[]  {
    const result = [];

    for (let [name, condition] of this.conditions.iterate()) {
      result.push({ name, condition });
    }

    return sortBy(result, 'condition.priority');
  }

  castState(value: any, state: ?ValidationState): ValidationState  {
    if (!(state instanceof ValidationState)) {
      state = new ValidationState(state);
    }

    return Object.assign(state, { value });
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

  static registerAll(conditions: {[key: string]: ConditionSubClass}) {
    forOwn(conditions, (value, key) => this.register(key, value));
  }

  static register(name: string, ConditionCtor: ConditionSubClass): void {
    const proto: Object = this.prototype;

    proto[name] = this.getApiFactory(name, ConditionCtor);
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
