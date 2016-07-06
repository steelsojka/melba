import defaults from 'lodash/defaults';

export default class Condition {
  constructor() {
    defaults(this, {
      priority: 0
    });
  }

  validate() {
    return true;
  }

  sanitize(value) {
    return value;
  }

  getReturnValue(type) {
    return type;
  }
}
