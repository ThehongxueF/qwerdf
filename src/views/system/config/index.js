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

export const collegeFormDesc = {
  name: {
    label: '站点名称',
    type: 'input',
    required: true,
    layout: 12,
    rules: { max: 14, message: '不能超过14个字', trigger: 'change' },
    attrs: {
      placeholder: '请输入高校名称（不能超过14个字）'
    }
  },
  badge: {
    label: '站点LOGO',
    type: 'image-uploader',
    attrs: {
      ...imgUploadOptions,
      headers
    }
  }
}

export const baseFormDesc = {
  introduction: {
    label: '站点简介',
    type: 'textarea'
  },
  theme: {
    label: '主题色',
    type: 'color'
  },
  telephone: {
    label: '电话',
    type: 'input',
    rules: [
      // eslint-disable-next-line prefer-regex-literals
      { pattern: new RegExp(/^(((\+\d{2}-)?(0\d{2,3}[-\s])?\d{7,10})|((\+\d{2}-)?(\d{2,3}-)?([1][3-9][0-9]\d{8})))$/, ''), trigger: 'change', message: '请输入正确的电话号码' }
    ]
  },
  email: {
    label: '邮箱',
    type: 'input',
    rules: [
      { pattern: new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, ''), trigger: 'change', message: '请输入正确的邮箱' }
    ]
  },
  workHours: {
    label: '工作时间',
    type: 'input'
  }
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

export const introductionFormDesc = {
  introduction: {
    label: '首页介绍',
    type: 'textarea'
  }
}

export const contactFormDesc = {
  telephone: {
    label: '电话',
    type: 'input',
    rules: [
      // eslint-disable-next-line prefer-regex-literals
      { pattern: new RegExp(/^(((\+\d{2}-)?(0\d{2,3}[-\s])?\d{7,10})|((\+\d{2}-)?(\d{2,3}-)?([1][3-9][0-9]\d{8})))$/, ''), trigger: 'change', message: '请输入正确的电话号码' }
    ]
  },
  email: {
    label: '邮箱',
    type: 'input',
    rules: [
      { pattern: new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, ''), trigger: 'change', message: '请输入正确的邮箱' }
    ]
  },
  workHours: {
    label: '工作时间',
    type: 'input'
  }
}
