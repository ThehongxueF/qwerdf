import {
  isPlainObject,
  isArray,
  camelCase,
  snakeCase
} from 'lodash'

function deepMapKeys (value, map) {
  if (isPlainObject(value)) {
    const obj = value
    const newObj = {}
    for (const [key, val] of Object.entries(obj)) {
      newObj[map(key)] = deepMapKeys(val, map)
    }
    for (let key in newObj) {
      if (key === 'is_to_approve') {
        key = 'isToApprove'
      }
      if (key === 'target_approve_template_id') {
        key = 'targetApproveTemplateId'
      }
    }
    return newObj
  } else if (isArray(value)) {
    const array = value
    return array.map(val => deepMapKeys(val, map))
  } else {
    return value
  }
}

function toCamelcase (value) {
  return deepMapKeys(value, key => camelCase(key))
}

function toSnakecase (value) {
  return deepMapKeys(value, key => snakeCase(key))
}

export {
  toCamelcase,
  toSnakecase
}

// 字符串下划线转驼峰
const formatToHump = (value) => {
  return value.replace(/\_(\w)/g, (_, letter) => letter.toUpperCase())
}

// 字符串驼峰转下划线
const formatToLine = (value) => {
  // 这两个特殊字段不需要转化
  if (value === 'targetApproveTemplateId' || value === 'isToApprove') {
    return value
  } else {
    return value.replace(/([A-Z])/g, '_$1').toLowerCase()
  }
}

/**
 * 数据对象key 驼峰下划线互相转化
 * @param {Object} data 需要转换的对象
 * @param {String} type hump-转驼峰 toLine-转下划线
 */
const formatHumpLineTransfer = (data, type = 'hump') => {
  let hump = ''
  // 转换对象中的每一个键值为驼峰的递归
  const formatTransferKey = (data) => {
    if (data instanceof Array) {
      data.forEach(item => formatTransferKey(item))
    } else if (data instanceof Object) {
      for (const key in data) {
        hump = type === 'hump' ? formatToHump(key) : formatToLine(key)
        data[hump] = data[key]
        if (key !== hump) {
          delete data[key]
        }
        if (data[hump] instanceof Object) {
          formatTransferKey(data[hump])
        }
      }
    } else if (typeof data === 'string') {
      data = type === 'hump' ? formatToHump(data) : formatToLine(data)
    }
  }
  formatTransferKey(data)
  return data
}

export {
  formatHumpLineTransfer
}
