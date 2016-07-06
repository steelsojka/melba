import Condition from '../../Condition';

export default class Default extends Condition {
  constructor(defaultValue) {
    super();

    this.defaultValue = defaultValue;
  }

  sanitize(value, ...args) {
    if (state.isEmptyValue(value)) {
      return this.resolveValue(value, ...args);
    }

    return value;
  }
}
