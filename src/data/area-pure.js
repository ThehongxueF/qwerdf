import REGION_DATA from 'china-area-data'

const provinceObject = REGION_DATA['86'] // 省份对象
const regionData = []

/**
 * 与 area 之间的关系
 *
 * regionData：
 *
 * label 和 value 都为省份汉字， 可直接做【级联选择器】的 options
 *
*/

// 计算省
for (const prop in provinceObject) {
  regionData.push({
    code: prop, // 省份code值
    value: provinceObject[prop], // 省份汉字
    label: provinceObject[prop]
  })
}
// 计算市
for (let i = 0, len = regionData.length; i < len; i++) {
  const provinceCode = regionData[i].code
  const provinceChildren = []
  for (const prop in REGION_DATA[provinceCode]) {
    provinceChildren.push({
      code: prop,
      value: REGION_DATA[provinceCode][prop],
      label: REGION_DATA[provinceCode][prop]
    })
  }
  if (provinceChildren.length) {
    regionData[i].children = provinceChildren
  }
}

// 计算区
for (let i = 0, len = regionData.length; i < len; i++) {
  const province = regionData[i].children
  if (province) {
    for (let j = 0, len = province.length; j < len; j++) {
      const cityCode = province[j].code
      const cityChildren = []
      for (const prop in REGION_DATA[cityCode]) {
        cityChildren.push({
          code: prop,
          value: REGION_DATA[cityCode][prop],
          label: REGION_DATA[cityCode][prop]
        })
      }
      if (cityChildren.length) {
        province[j].children = cityChildren
      }
    }
  }
}

export { regionData }
