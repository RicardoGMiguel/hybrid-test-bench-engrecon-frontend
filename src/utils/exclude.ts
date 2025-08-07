type AnyObject = { [key: string]: any };

/**
 * Removes one or more properties from an object and returns a new object without those properties.
 *
 * @template T - The type of the input object.
 * @template K - The type of the keys to be excluded from the object.
 * @param {T} obj - The input object from which properties will be excluded.
 * @param {K | K[]} keys - The key(s) to be excluded from the object. Can be a single key or an array of keys.
 * @returns {Omit<T, K>} A new object without the specified properties.
 *
 * @example
 * const user = { name: "Eliel", age: 20, born: 2003 };
 * const updatedUser1 = exclude(user, "name");
 * // updatedUser1: { age: 20, born: 2003 }
 *
 * const updatedUser2 = exclude(user, ["age", "born"]);
 * // updatedUser2: { name: "Eliel" }
 */
export default function exclude<T extends AnyObject, K extends keyof T>(
  obj: T,
  keys: K | K[]
): Omit<T, K> {
  const newObj = { ...obj };

  if (Array.isArray(keys)) {
    keys.forEach((key) => delete newObj[key]);
  } else {
    delete newObj[keys];
  }

  return newObj;
}
