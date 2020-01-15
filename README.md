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
  diff: [['2'], ['1', '0', 'rc', '1']]
}))
```

## API

### colorizeSemverDiff(semverDiff)

Returns a string with ANSI colors.

#### semverDiff.change

type: `unknown`, `breaking`, `feature`, `fix`

#### semverDiff.diff[0]

type: `string[]`

An array of version parts that are unchanged. For instance, in a diff between
`1.0.0` and `1.2.0` the unchanged part will be `['1']`.

#### semverDiff.diff[1]

type: `string[]`

An array of version parts that are changed. For instance, in a diff between
`1.0.0` and `1.2.0` the changed part will be `['2', '0']`.

## Related

* [@pnpm/semver-diff](https://github.com/pnpm/semver-diff) - Gets the difference between two semver versions

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io/)
