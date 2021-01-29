export const firstInitials = (str) => {
  return str
    ?.split(' ')
    .map((s) => s.charAt(0))
    .join('')
    .toUpperCase()
}
