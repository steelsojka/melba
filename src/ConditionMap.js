// @flow

import type Condition from './Condition';

export default class ConditionMap {
  map: Map<string, Condition[]>;

  constructor() {
    this.map = new Map();
  }

  set(name: string, condition: Condition): void {
    if (condition.multiples) {
      let conditions: ?Condition[] = this.get(name);

      if (!Array.isArray(conditions)) {
        conditions = [];
      }

      conditions.push(condition);
      this.map.set(name, conditions);

      return;
    }

    this.map.set(name, [condition]);
  }

  get(name: string): ?Condition[] {
    return this.map.get(name);
  }

  has(name: string): boolean {
    return Boolean(this.get(name));
  }

  delete(name: string): void {
    this.map.delete(name);
  }

  clone(): ConditionMap {
    const newMap = new this.constructor();

    for (let [name, conditionList]: [string, Condition[]] of this.map) {
      newMap.map.set(name, conditionList.slice(0));
    }

    return newMap;
  }

  * iterate(): Iterator<[string, Condition]> {
    for (let [name, conditions]: [string, Condition[]] of this.map) {
      for (let condition: Condition of conditions) {
        yield [name, condition];
      }
    }
  }
}
