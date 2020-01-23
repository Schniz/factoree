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

it('merges the default', () => {
  const user = factory<User>({ github: 'Schniz' });
  const instance = user({ name: 'Gal' });
  expect(instance).toEqual({
    name: 'Gal',
    github: 'Schniz',
  });
  expect(instance).not.toEqual({
    name: 'Gal',
  });
});

it(`doesn't break in equality error tests because of missing keys`, () => {
  const user = factory<User>({ github: 'Schniz' });
  const instance = user({ name: 'Gal' });
  expect(() => {
    expect(instance).toEqual({});
  }).toThrow(/deep equality/);
})
