const isArray = Array.isArray;
const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;

// Checks if the two values are exactly equal.
// https://github.com/epoberezkin/fast-deep-equal
export function equal<A extends any, B extends any>(a: A, b: B): boolean {
  // @ts-ignore
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a),
      arrB = isArray(b),
      i,
      length,
      key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date,
      dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp,
      regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length) return false;

    for (i = length; i-- !== 0; ) if (!hasProp.call(b, keys[i])) return false;

    for (i = length; i-- !== 0; ) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return a !== a && b !== b;
}

export function shallowEqual<A extends any, B extends any>(a: A, b: B): boolean {
  // @ts-ignore
  if (a === b) return true;
  if (!(a instanceof Object) || !(b instanceof Object)) return false;

  var keys = keyList(a);
  var length = keys.length;

  for (let i = 0; i < length; i++) if (!(keys[i] in b)) return false;

  for (let i = 0; i < length; i++) if (a[keys[i]] !== b[keys[i]]) return false;

  return length === keyList(b).length;
}
