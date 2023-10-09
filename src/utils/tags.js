import { flattenDeep, uniq } from 'lodash'

const flattenTag = (data) => {
  const tags = []
  const formatTag = (item) => {
    tags.push({
      id: item.id,
      name: item.name,
      parentId: item.parentId
    })
    if (item.subordinates && item.subordinates.length) {
      item.subordinates.forEach((_item) => {
        const name = `${item.name}/${_item.name}`
        formatTag({ ..._item, name })
      })
    }
  }
  formatTag(data)
  return tags
}

export const flattenTags = tags => {
  const _tags = tags.map(item => flattenTag(item))
  return flattenDeep(_tags)
}

/**
 * 勾选二级标签需要将其父节点id也包含在结果中
 * @param {节点值数组} values
 * @param {标签树} tags
 * @returns 节点值+节点对应父节点（去重）的值
 */
export const completeWithParentId = (values, tags) => {
  const results = []
  const formatTags = flattenTags(tags)
  values.forEach(value => {
    const _tag = formatTags.find(tag => +tag.id === +value)
    if (_tag && _tag.parentId) {
      results.push(_tag.parentId)
    }
  })
  return [...values, ...uniq(results)]
}
