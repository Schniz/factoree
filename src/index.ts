import { inspect } from 'util';
export function factory<T>(
  defaults?: Partial<T>
): (overrides?: Partial<T>) => T {
  return overrides => {
    const data = { ...defaults, ...overrides };

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
