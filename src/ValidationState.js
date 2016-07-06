import assign from 'lodash/assign';

export default class ValidationState {
  constructor() {
    assign(this, {
      root: null,
      path: null,
      invalid: [],
      valid: []
    });
  }

  snapshot() {
    return {
      path: this.path,
      root: this.root,
      invalid: this.invalid.slice(0),
      valid: this.valid.slice(0)
    };
  }

  isInvalid(condition, state) {
    this.invalid.push({ condition, state: state.snapshot() });
  }

  isValid(condition, state) {
    this.valid.push({ condition, state: state.snapshot() });
  }

  spawn() {
    return assign(new ValidationState(), {
      isInvalid: this.isInvalid.bind(this),
      isValid: this.isValid.bind(this)
    });
  }
}
