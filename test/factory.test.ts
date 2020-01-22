import { factory } from '../src';

interface User {
  name: string;
  github: string;
}

it('passes the overrides', () => {
  const user = factory<User>();
  const instance = user({ name: 'Gal' });
  expect(instance.name).toBe('Gal');
});

it('throws on undefined argument', () => {
  const user = factory<User>();
  const instance = user({ name: 'Gal' });
  expect(() => {
    console.log(instance.github);
  }).toThrowError();
});

it('merges the defaults', () => {
  const user = factory<User>({ github: 'Schniz' });
  const instance = user({ name: 'Gal' });
  expect(instance.github).toBe('Schniz');
  expect(instance.name).toBe('Gal');
});
