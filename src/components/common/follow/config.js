import { fileUploadOptions } from '@/data/options'

export const followFormDesc = {
  content: {
    label: '跟进内容',
    type: 'textarea',
    required: true
  },
  tag: {
    options: [
      {
        text: '线上回访',
        value: '线上回访'
      },
      {
        text: '线下拜访',
        value: '线下拜访'
      }
    ],
    label: '跟进标签',
    type: 'select'
  },
  images: {
    label: '跟进附件',
    type: 'upload-file',
    attrs: {
      isShowTip: false,
      drag: true,
      multiple: true,
      limit: 5,
      ...fileUploadOptions
    },
    valueFormatter: function (images) {
      images = images.map(item => item.url ? item.url : item)
      return images
    }
  }
}

export const followColumns = [
  {
    label: '跟进内容',
    prop: 'content'
  },
  {
    label: '跟进标签',
    prop: 'tag'
  },
  {
    label: '跟进附件',
    prop: 'images'
  }
]
