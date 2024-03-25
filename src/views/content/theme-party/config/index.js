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
      title: '轮播图'
    }
  },
  orderList: {
    type: 'image'
  }
}
