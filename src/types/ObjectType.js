import forOwn from 'lodash/forOwn';
import get from 'lodash/get';

import Type from '../Type';

export default class ObjectType extends Type {
  constructor(schema = {}) {
    super();

    this.schema = schema;
  }

  validate(value, state) {
    state = super.validate(value, state);

    forOwn(this.schema, (type, key) => {
      type.validate(get(value, key), state.spawn());
    });

    return state;
  }
}
