import { equal, throws } from 'node:assert/strict'
import { test } from 'node:test'

import chalk from 'chalk'

import { colorizeSemverDiff, type SEMVER_CHANGE } from '../src/index.ts'

// Force basic ANSI colors so the test verifies escape codes regardless of TTY.
chalk.level = 1

test('throws on invalid args', () => {
  throws(() => colorizeSemverDiff(null as never), { message: 'semverDiff must be defined' })
  throws(() => colorizeSemverDiff({ change: null } as never), { message: 'semverDiff.change must be defined' })
})

const fixtures: Array<[{ change: SEMVER_CHANGE, diff: [string[], string[]] }, string]> = [
  [
    { change: 'breaking', diff: [[], ['1', '0', '0']] },
    chalk.redBright.bold('1.0.0'),
  ],
  [
    { change: 'feature', diff: [['1'], ['0', '0']] },
    `1.${chalk.yellowBright.bold('0.0')}`,
  ],
  [
    { change: 'fix', diff: [['1', '0'], ['0']] },
    `1.0.${chalk.greenBright.bold('0')}`,
  ],
  [
    { change: 'unknown', diff: [['0', '0'], ['2']] },
    `0.0.${chalk.redBright.bold('2')}`,
  ],
  [
    { change: 'unknown', diff: [['0'], ['0', '2']] },
    `0.${chalk.redBright.bold('0.2')}`,
  ],
  [
    { change: 'unknown', diff: [[], ['1', '0', '0']] },
    chalk.redBright.bold('1.0.0'),
  ],
  [
    { change: 'unknown', diff: [['1', '0', '0'], ['0']] },
    `1.0.0-${chalk.redBright.bold('0')}`,
  ],
  [
    { change: 'unknown', diff: [['1', '0', '0'], ['rc', '1']] },
    `1.0.0-${chalk.redBright.bold('rc.1')}`,
  ],
  [
    { change: 'unknown', diff: [['1', '0', '0', 'rc'], ['1']] },
    `1.0.0-rc.${chalk.redBright.bold('1')}`,
  ],
  [
    { change: 'unknown', diff: [['1', '0'], ['1', 'beta', '1']] },
    `1.0.${chalk.redBright.bold('1-beta.1')}`,
  ],
]

for (const [arg, expected] of fixtures) {
  test(`colorizing ${JSON.stringify(arg)} returns ${expected}`, () => {
    equal(colorizeSemverDiff(arg), expected)
  })
}
