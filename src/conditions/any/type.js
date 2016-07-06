import Condition from '../../Condition';

export default class AnyTypeCheck extends Condition {
  constructor() {
    super();

    this.priority = 100;
  }

  validate(value, state, ...args) {
    if (state.isEmptyValue(value)) {
      return true;
    }

    return this.typeCheck(value, state, ...args);
  }
};
