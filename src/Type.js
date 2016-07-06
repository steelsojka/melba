import assign from 'lodash/assign';
import sortBy from 'lodash/sortBy';
import isObject from 'lodash/isObject';
import forOwn from 'lodash/forOwn';

import ValidationState from './ValidationState';

export default class Type {
  constructor() {
    assign(this, {
      conditions: new Map()
    });

    if (this.constructor.typeCondition) {
      this.conditions.set('type', new this.constructor.typeCondition());
    }
  }

  validate(value, state) {
    state = this.castState(value, state);

    const conditions = this.getConditionChain();
    const { collector } = state;

    for (let { name, condition } of conditions) {
      condition.modifyState(state, value, this);
    }

    for (let { name, condition } of conditions) {
      if (condition.validate(value, state, this)) {
        collector.accept(condition, state);
      } else {
        collector.reject(condition, state);
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

  isValid(value) {
    return this.validate(value).isValid;
  }

  static register(name, ConditionCtor) {
    if (isObject(name)) {
      forOwn(name, (value, key) => this.register(key, value));

      return;
    }

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
