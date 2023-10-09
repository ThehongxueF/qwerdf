import _ from 'lodash'

function deepMapKeys (value, map) {
  if (_.isPlainObject(value)) {
    const obj = value
    const newObj = {}
    for (const [key, val] of Object.entries(obj)) {
      newObj[map(key)] = deepMapKeys(val, map)
    }
    return newObj
  } else if (_.isArray(value)) {
    const array = value
    return array.map(val => deepMapKeys(val, map))
  } else {
    return value
  }
}

function toCamelcase (value) {
  return deepMapKeys(value, key => {
    if (key.includes('.')) {
      return key.split('.').map(item => _.camelCase(item)).join('.')
    }
    return _.camelCase(key)
  })
}

function toSnakecase (value) {
  return deepMapKeys(value, key => {
    if (key.includes('.')) {
      return key.split('.').map(item => _.snakeCase(item)).join('.')
    }
    return _.snakeCase(key)
  })
}

export default {
  toCamelcase,
  toSnakecase
}
