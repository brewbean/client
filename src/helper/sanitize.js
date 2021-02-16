function convertEmptyStringToNull(obj) {
  let sanitizedObj = {}
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    sanitizedObj[key] =
      typeof value === 'string' && value.trim() === '' ? null : value
  })
  return sanitizedObj
}

/**
 * Omit key-value pairs in obj that aren't mentioned in schema
 * - Possibly not what we want long term
 */
function checkSchema(schema, obj) {
  const result = Object.keys(obj).reduce(
    (acc, key) => {
      // skip any undefined property in schema
      if (!schema[key]) return acc

      if (obj[key] === null && !schema[key].isNullable) {
        return {
          ...acc,
          errors: [
            ...acc.errors,
            {
              key,
              type: 'null-check',
              message: 'non-nullable field is null',
            },
          ],
        }
      }
      return { ...acc, value: { ...acc.value, [key]: obj[key] } }
    },
    { value: {}, errors: [] }
  )

  if (result.errors.length === 0) {
    result.errors = null
  }
  if (Object.keys(result.value).length === 0) {
    result.value = null
  }

  return result
}

export { convertEmptyStringToNull, checkSchema }
