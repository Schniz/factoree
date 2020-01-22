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
export function factory<T>(defaults?: Partial<T>): Factory<T> {
  return attributes => {
    const data = { ...defaults, ...attributes };

    return new Proxy(data, {
      has(target: Partial<T>, p: keyof T) {
        return (target as Object).hasOwnProperty(p);
      },
      get(target: Partial<T>, p: keyof T) {
        if ((target as Object).hasOwnProperty(p)) {
          return target[p];
        } else {
          throw new Error(
            `Can't access undefined key '${p}' for object ${inspect(data)}`
          );
        }
      },
    }) as T;
  };
}
