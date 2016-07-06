import assign from 'lodash/assign';

export default class ResultCollector {
  constructor() {
    assign(this, {
      accepted: [],
      rejected: []
    });
  }

  reject(condition, state) {
    this.rejected.push({ condition, state });
  }

  accept(condition, state) {
    this.accepted.push({ condition, state });
  }
}
