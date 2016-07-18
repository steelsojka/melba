// @flow

import isString from 'lodash/isString';
import get from 'lodash/get';

import type ValidationState from './ValidationState';

const CONTEXT_SYMBOL = '$';

export default class PathParser {
  path: string|string[];
  fromContext: boolean;
  parsedPath: string;

  constructor(path: string|string[]) {
    Object.assign(this, {
      path,
      fromContext: false
    });

    this.parse();
  }

  parse() {
    let splitPath: string[];

    if (typeof this.path === 'string') {
      splitPath = this.path.split('.');
    } else {
      splitPath = this.path;
    }

    if (splitPath[0] === CONTEXT_SYMBOL) {
      this.fromContext = true;

      splitPath.shift();
    }

    this.parsedPath = splitPath.join('.');
  }

  getFromState(state: ValidationState): any {
    let { container } = state;

    if (this.fromContext)  {
      container = state.context;
    }

    return get(container, this.parsedPath);
  }
}
