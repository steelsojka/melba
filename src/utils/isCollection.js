import overSome from 'lodash/overSome';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';

export default overSome(isString, isObject)
