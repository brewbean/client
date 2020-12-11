import { alertType } from 'components/FormAlert'

export const validatePassword = (password) => {
  const warnings = { ...passwordRequirements }
  const lowerCaseLetters = /[a-z]/g
  const upperCaseLetters = /[A-Z]/g
  const numbers = /[0-9]/g
  const specialCharacters = /[@$!%*#?&]/g

  warnings.length.isActive = password.length < 8
  warnings.lowercase.isActive = !password.match(lowerCaseLetters)
  warnings.uppercase.isActive = !password.match(upperCaseLetters)
  warnings.number.isActive = !password.match(numbers)
  warnings.special.isActive = !password.match(specialCharacters)

  return warnings
}

export const passwordRequirements = {
  length: {
    isActive: false,
    type: alertType.WARNING,
    text: 'must contain at least 8 characters long',
  },
  lowercase: {
    isActive: false,
    type: alertType.WARNING,
    text: 'must contain at least 1 lowercase character',
  },
  uppercase: {
    isActive: false,
    type: alertType.WARNING,
    text: 'must contain at least 1 uppercase character',
  },
  number: {
    isActive: false,
    type: alertType.WARNING,
    text: 'must contain at least 1 number',
  },
  special: {
    isActive: false,
    type: alertType.WARNING,
    text: 'must contain at least 1 special characters',
  },
}
