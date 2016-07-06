import isNil from 'lodash/isNil';
import negate from 'lodash/negate';

import Condition from '../Condition';

export default class RequiredAny extends Condition {
  constructor() {
    super();

    assign(this, {
      validate: negate(isNil),
      priority: 20
    });
  }
};
