export const firstInitials = (str) => {
  return str
    ?.split(' ')
    .map((s) => s.charAt(0))
    .join('')
    .toUpperCase()
}

export const wordCapitalized = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1)
