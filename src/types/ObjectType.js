import forOwn from 'lodash/forOwn';
import get from 'lodash/get';

import Type from '../Type';
import ObjectTypeCheck from '../conditions/object/type';

export default class ObjectType extends Type {
  static get typeCondition() {
    return ObjectTypeCheck;
  }

  constructor(schema = {}) {
    super();

    this.schema = schema;
  }

  validate(value, state) {
    state = super.validate(value, state);

    forOwn(this.schema, (type, key) => {
      const childState = state.clone();

      childState.path.push(key);

      type.validate(get(value, key), childState);
    });

    return state;
  }
}
