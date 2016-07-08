// @flow

import isString from 'lodash/isString';
import get from 'lodash/get';

import type ValidationState from './ValidationState';

const ROOT_SYMBOL = '$';

export default class PathParser {
  path: string|string[];
  fromRoot: boolean;
  parsedPath: string;

  constructor(path: string|string[]) {
    Object.assign(this, {
      path,
      fromRoot: false
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

    if (splitPath[0] === ROOT_SYMBOL) {
      this.fromRoot = true;

      splitPath.shift();
    }

    this.parsedPath = splitPath.join('.');
  }

  getFromState(state: ValidationState): any {
    let { container } = state;

    if (this.fromRoot)  {
      container = state.root;
    }

    return get(container, this.parsedPath);
  }
}
