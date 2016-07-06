import assign from 'lodash/assign';
import sortBy from 'lodash/sortBy';

import ValidationState from './ValidationState';

export default class Type {
  constructor() {
    assign(this, {
      conditions: new Map()
    });
  }

  validate(value, state) {
    state = this.castState(value, state);

    for (let { name, condition } of this.getConditionChain()) {
      if (condition.validate(value, this)) {
        state.isInvalid(condition, state);
      } else {
        state.isValid(condition, state);
      }
    }

    return state;
  }

  getConditionChain() {
    const result = [];

    for (let [name, condition] of this.conditions) {
      result.push({ name, condition });
    }

    return sortBy(result, 'condition.priority');
  }

  castState(value, state) {
    if (state instanceof ValidationState) {
      return state;
    }

    return assign(new ValidationState(), {
      root: value
    });
  }

  static register(name, ConditionCtor) {
    this.prototype[name] = this.getApiFactory(name, ConditionCtor);
  }

  static getApiFactory(name, ConditionCtor) {
    return function apiFactory(...args) {
      const condition = new ConditionCtor(...args);

      this.conditions.set(name, condition);

      return condition.getReturnValue(this);
    }
  }
}
