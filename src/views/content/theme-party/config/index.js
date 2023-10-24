import { Local } from '@/utils/storage'
import { getToken } from '@/utils/auth'
import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'

import {
  imgUploadOptions
} from '@/data/options'

const headers = {
  [TOKEN_KEY]: getToken(),
  [COLLEGE_DOMAIN_KEY]: Local.get(COLLEGE_DOMAIN_KEY)
}

export const carouselFormDesc = {
  carousels: {
    label: '',
    type: 'image-uploader',
    attrs: {
      multiple: true,
      size: 100,
      ...imgUploadOptions,
      headers,
      title: '轮播图',
      crop: true, // 是否裁剪
      cropHeight: 542, // 裁剪高度
      cropWidth: 1080 // 裁剪宽度
    }
  },
  orderList: {
    type: 'image'
  }
}
