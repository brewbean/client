export const firstInitials = (str) => {
  return str
    ?.split(' ')
    .map((s) => s.charAt(0))
    .join('')
    .toUpperCase()
}

export const wordCapitalized = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1)

/**
 * base: 'text-indigo-500'
 * classObj: { 'text-red-500': hasError }
 */
export const combineClass = (base, classObj) =>
  (
    base +
    Object.keys(classObj).reduce(
      (acc, curr) => (classObj[curr] ? acc + ' ' + curr : acc),
      ''
    )
  ).trimEnd()

export const createId = (str) => str.toLowerCase().replace(/ /g, '-')
