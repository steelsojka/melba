import assign from 'lodash/assign';

import Condition from '../../Condition';

export default class RequiredAny extends Condition {
  constructor() {
    super();

    assign(this, {
      priority: 20
    });
  }

  validate(value, state) {
    return !state.isEmptyValue(value);
  }
};
