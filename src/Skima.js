// @flow

import forOwn from 'lodash/forOwn';

import type { TypeSubClass } from './Type';

export default class Skima {
  constructor(types: {[key: string]: TypeSubClass} = {}) {
    forOwn(types, (value, name) => this.register(name, value));
  }

  register(name: string, TypeCtor: TypeSubClass): void {
    const self: Object = this;

    self[name] = this.getApiFactory(name, TypeCtor);
  }

  getApiFactory(name: string, TypeCtor: TypeSubClass): Function {
    return function typeApiFactory(...args) {
      return new TypeCtor(...args);
    };
  }
}
