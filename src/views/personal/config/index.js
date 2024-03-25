import { Local } from '@/utils/storage'
import { getToken } from '@/utils/auth'
import { imgUploadOptions } from '@/data/options'
import { TOKEN_KEY, COLLEGE_DOMAIN_KEY } from '@/data/constant'

const headers = {
  [TOKEN_KEY]: getToken(),
  [COLLEGE_DOMAIN_KEY]: Local.get(COLLEGE_DOMAIN_KEY)
}

export const modelMap = {
  id: 'ID',
  name: '姓名',
  headImageUrl: '头像',
  username: '用户名',
  mobile: '手机号',
  email: '邮箱',
  organization: '所属机构',
  organizationUnits: '所属组织机构',
  organizationUnitIds: '所属组织机构',
  post: '职位/职务',
  location: '机构所在地'
}

export const formDesc = {
  headImageUrl: {
    label: modelMap.headImageUrl,
    type: 'image-uploader',
    attrs: {
      ...imgUploadOptions,
      headers
    }
  },
  username: {
    label: modelMap.username,
    type: 'input',
    required: true,
    layout: 12
  },
  name: {
    label: modelMap.name,
    type: 'input',
    required: true,
    layout: 12
  },
  email: {
    label: modelMap.email,
    type: 'input',
    required: true,
    layout: 12,
    rules: [
      { pattern: new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, ''), trigger: 'change', message: '请输入正确的邮箱' }
    ]
  },
  post: {
    label: modelMap.post,
    type: 'input',
    layout: 12
  }
}
