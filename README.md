# `factoree`

> 💥🔒 Fail early, fail fast: type-safe and runtime-safe partial factories for TypeScript

The ease of `x as any as MyType` without getting weird `undefined`s: `factoree` provides a strict factory for testing. Ensures you don't accidentally access a field you haven't created, and therefore helping with catching bugs early on.

```ts
import { factory } from 'factoree';

type User = { name: string; twitterHandle?: string };

const createUser = factory<User>({ twitterHandle: undefined });

const gal = createUser({ name: 'Gal', twitterHandle: 'galstar' }); // => User
const joe = createUser({}); // => User

gal.name; // => "Gal"
joe.name; // => Error! Can't access undefined key 'name' for object {twitterHandle: undefined}
```

## Local Development

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

Below is a list of commands you will probably find useful.

### Git hooks

If you want to have git hooks for faster feedback, run `npx husky install`.
All of them also run in CI, so it will build if lint fails, etc.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
