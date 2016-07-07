import isBoolean from 'lodash/isBoolean';

export default class BooleanTypeCheck extends AnyTypeCheck {
  typeCheck(value) {
    return isBoolean(value);
  }

  sanitize(value, state) {
    if (state.isEmptyValue(value)) {
      return value;
    }

    if (value === 1 || value === 'true' || value === true) {
      return true;
    }

    if (value === 0 || value === 'false' || value === false) {
      return false;
    }

    state.collector.reject(state, this);

    return value;
  }
}
