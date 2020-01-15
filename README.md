# @pnpm/colorize-semver-diff

> Makes a colorful semver diff

<!--@shields('npm', 'travis')-->
[![npm version](https://img.shields.io/npm/v/@pnpm/colorize-semver-diff.svg)](https://www.npmjs.com/package/@pnpm/colorize-semver-diff) [![Build Status](https://img.shields.io/travis/pnpm/colorize-semver-diff/master.svg)](https://travis-ci.org/pnpm/colorize-semver-diff)
<!--/@-->

## Installation

```sh
<pnpm|yarn|npm> add @pnpm/colorize-semver-diff
```

## Usage

```ts
import colorizeSemverDiff from '@pnpm/colorize-semver-diff'

console.log(colorizeSemverDiff({
  change: 'feature',
  diff: [['2'], ['1', '0']]
}))
```

## Related

* [@pnpm/semver-diff](https://github.com/pnpm/semver-diff) - Gets the difference between two semver versions

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io/)
