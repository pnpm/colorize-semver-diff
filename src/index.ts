import chalk from 'chalk'

export type SEMVER_CHANGE = 'breaking' | 'feature' | 'fix' | 'unknown'

export type SemverDiff = {
  change: SEMVER_CHANGE
  diff: [string[], string[]]
}

const DIFF_COLORS: Partial<Record<SEMVER_CHANGE, (s: string) => string>> = {
  feature: chalk.yellowBright.bold,
  fix: chalk.greenBright.bold,
}

export function colorizeSemverDiff (semverDiff: SemverDiff): string {
  if (!semverDiff) {
    throw new TypeError('semverDiff must be defined')
  }
  if (typeof semverDiff.change !== 'string') {
    throw new TypeError('semverDiff.change must be defined')
  }
  const highlight = DIFF_COLORS[semverDiff.change] ?? chalk.redBright.bold
  const same = joinVersionTuples(semverDiff.diff[0], 0)
  const other = highlight(
    joinVersionTuples(semverDiff.diff[1], semverDiff.diff[0].length)
  )
  if (!same) return other
  // Happens when current is 1.0.0-rc.0 and latest is 1.0.0
  if (!other) return same
  return semverDiff.diff[0].length === 3
    ? `${same}-${other}`
    : `${same}.${other}`
}

function joinVersionTuples (versionTuples: string[], startIndex: number): string {
  const neededForSemver = 3 - startIndex
  if (versionTuples.length <= neededForSemver || neededForSemver <= 0) {
    return versionTuples.join('.')
  }
  return `${versionTuples.slice(0, neededForSemver).join('.')}-${versionTuples.slice(neededForSemver).join('.')}`
}
