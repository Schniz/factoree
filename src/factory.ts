import { inspect } from 'util';

/**
 * A factory that will throw errors when accessing
 * an unsetted value
 */
export type Factory<T> = (
  /**
   * Attributes to set for the instance.
   * These will extend and override the attributes provided to the `defaults` when the factory was created
   */
  attributes?: Partial<T>
) => T;

/**
 * Creates a strict factory
 *
 * @param defaults the default values that would appear on all instances
 */
export function factory<T extends Object>(defaults?: Partial<T>): Factory<T> {
  return attributes => {
    const data = { ...defaults, ...attributes };
    const proxy = new Proxy(data, {
      has(target: Partial<T>, p: keyof T) {
        return (target as Object).hasOwnProperty(p);
      },
      ownKeys(target: Partial<T>) {
        return Reflect.ownKeys(target);
      },
      get(target: Partial<T>, p: keyof T) {
        if (target?.hasOwnProperty?.(p) || target[p]) {
          return target[p];
        } else if (isExceptionKey(p)) {
          return undefined;
        } else {
          throw new Error(
            `Can't access undefined key '${inspect(p)}' for object ${inspect(
              target
            )}`
          );
        }
      },
    }) as T;
    return proxy;
  };
}

const JEST_INTERNAL_KEYS: (string | number | symbol)[] = [
  Symbol.iterator,
  Symbol.toStringTag,
  'asymmetricMatch',
  'nodeType',
  '$$typeof',
  '@@__IMMUTABLE_ITERABLE__@@',
  '@@__IMMUTABLE_RECORD__@@',
];

const PROMISE_REQUIRED_KEYS: string[] = [
  // See https://github.com/Schniz/factoree/issues/2
  'then',
];

const EXCEPTION_KEYS_THAT_MUST_EXIST = [
  ...JEST_INTERNAL_KEYS,
  ...PROMISE_REQUIRED_KEYS,
];

function isExceptionKey(p: string | number | symbol): boolean {
  return EXCEPTION_KEYS_THAT_MUST_EXIST.indexOf(p) > -1;
}
