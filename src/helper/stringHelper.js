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

/**
 * Takes in a date and formats it to MM/DD/YYYY
 * @param {Date} date
 */
export const formatDate = (date) =>
  (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
  '/' +
  (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
  '/' +
  date.getFullYear()
