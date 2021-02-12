function convertEmptyStringToNull(obj) {
  let sanitizedObj = {}
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    sanitizedObj[key] =
      typeof value === 'string' && value.trim() === '' ? null : value
  })
  return sanitizedObj
}

function checkSchema(schema, obj) {
  const errors = Object.keys(obj).reduce((err, key) => {
    if (obj[key] === null && !schema[key].isNullable) {
      return [
        ...err,
        {
          key,
          type: 'null-check',
          message: 'non-nullable field is null',
        },
      ]
    }
    return err
  }, [])

  return errors.length > 0
    ? { value: null, errors }
    : { value: obj, errors: null }
}

export { convertEmptyStringToNull, checkSchema }
