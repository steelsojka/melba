import forOwn from 'lodash/forOwn';

export default class Skimama {
  constructor(types = {}) {
    forOwn(types, (value, name) => this.register(name, value));
  }

  register(name, TypeCtor) {
    this[name] = this.getApiFactory(name, TypeCtor);
  }

  getApiFactory(name, TypeCtor) {
    return function typeApiFactory(...args) {
      return new TypeCtor(...args);
    };
  }
}
