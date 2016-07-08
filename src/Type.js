// @flow

import sortBy from 'lodash/sortBy';
import forOwn from 'lodash/forOwn';

import ValidationState from './ValidationState';
import Condition from './Condition';

import type { ConditionSubClass } from './Condition';

type ConditionEntry = {
  name: string;
  condition: Condition;
};

export type TypeSubClass = Class<$Subtype<Type>>;

export default class Type {
  conditions: Map<string, Condition>;

  constructor() {
    Object.assign(this, {
      conditions: new Map()
    });
  }

  validate(value: any, state: ?ValidationState): ValidationState {
    state = this.castState(value, state);

    const conditions = this.getConditionChain();

    for (let { name, condition } of conditions) {
      condition.modifyState(state, value, this);
    }

    for (let { name, condition } of conditions) {
      if (condition.validate(value, state, this)) {
        state.accept(condition, state);
      } else {
        state.reject(condition, state);
      }
    }

    return state;
  }

  getConditionChain(): ConditionEntry[]  {
    const result = [];

    for (let [name, condition] of this.conditions) {
      result.push({ name, condition });
    }

    return sortBy(result, 'condition.priority');
  }

  castState(value: any, state: ?ValidationState): ValidationState  {
    if (!(state instanceof ValidationState)) {
      state = Object.assign(new ValidationState(state), {
        root: value
      });
    }

    return Object.assign(state, { value });
  }

  isValid(value: any, state: ?ValidationState): boolean {
    return this.validate(value, state).isValid;
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
      const condition = new ConditionCtor(...args);

      condition.install(name, this);

      return condition.getReturnValue(this);
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
