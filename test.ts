import chalk = require('chalk')
import test = require('tape')
import colorizeSemverDiff, { SEMVER_CHANGE } from './src'

test('throw error on invalid args', t => {
  t.throws(() => colorizeSemverDiff(null as any), 'semverDiff must be defined') // tslint:disable-line:no-any
  t.throws(() => colorizeSemverDiff({ change: null } as any), 'semverDiff.change must be defined') // tslint:disable-line:no-any
  t.end()
})

const fixtures: Array<[{ change: SEMVER_CHANGE, diff: [string[], string[]]}, string]> = [
  [
    { change: 'breaking', diff: [[], ['1', '0', '0']] },
    chalk`{redBright.bold 1.0.0}`,
  ],
  [
    { change: 'feature', diff: [['1'], ['0', '0']] },
    chalk`1.{yellowBright.bold 0.0}`,
  ],
  [
    { change: 'fix', diff: [['1', '0'], ['0']] },
    chalk`1.0.{greenBright.bold 0}`,
  ],
  [
    { change: 'unknown', diff: [['0', '0'], ['2']] },
    chalk`0.0.{redBright.bold 2}`,
  ],
  [
    { change: 'unknown', diff: [['0'], ['0', '2']] },
    chalk`0.{redBright.bold 0.2}`,
  ],
  [
    { change: 'unknown', diff: [[], ['1', '0', '0']] },
    chalk`{redBright.bold 1.0.0}`,
  ],
  [
    {
      change: 'unknown',
      diff: [['1', '0', '0'], ['0']]
    },
    chalk`1.0.0-{redBright.bold 0}`,
  ],
  [
    {
      change: 'unknown',
      diff: [['1', '0', '0'], ['rc', '1']]
    },
    chalk`1.0.0-{redBright.bold rc.1}`,
  ],
  [
    {
      change: 'unknown',
      diff: [['1', '0', '0', 'rc'], ['1']]
    },
    chalk`1.0.0-rc.{redBright.bold 1}`,
  ],
  [
    {
      change: 'unknown',
      diff: [['1', '0'], ['1', 'beta', '1']]
    },
    chalk`1.0.{redBright.bold 1-beta.1}`,
  ],
]

test('colorize semver diffs', t => {
  for (const [arg, expectedResult] of fixtures) {
    t.equal(
      colorizeSemverDiff(arg),
      expectedResult,
      `colorizing ${JSON.stringify(arg)} returns ${expectedResult}`,
    )
  }
  t.end()
})
