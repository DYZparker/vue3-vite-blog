// 保存各组件常量

/* Tag组件start */
export const tagTableMenu = [
  { 
    title: '标签',
    propName: 'tagName',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '颜色',
    propName: 'color',
    isEdit: true,
    hasSlot: true,
    width: 180
  }
]

export const searchTagMsg = {
  searchName: 'tagName',
  placeholderName: '标签'
}

export const initTagEditData = {
  index: -1,
  data: {
    _id: 0,
    tagName: '',
    color: '#000000'
  }
}

export const tagRules = {
  tagName: [
    { required: true, message: '请输入标签名', trigger: 'blur' },
    { min: 1, max: 24, message: '账号长度需要在1~24之间', trigger: 'blur' }
  ]
}
/* Tag组件end */

/* Link组件start */
export const linkTableMenu = [
  { 
    title: '链接名称',
    propName: 'linkName',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '链接地址',
    propName: 'href',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '图标地址',
    propName: 'img',
    isEdit: true,
    hasSlot: false,
    width: 180
  }
]

export const searchLinkMsg = {
  searchName: 'linkName',
  placeholderName: '链接'
}

export const initLinkEditData = {
  index: -1,
  data: {
    _id: 0,
    linkName: '',
    href: '',
    img: ''
  }
}

export const linkRules = {
  linkName: [
    { required: true, message: '请输入链接名', trigger: 'blur' },
    { min: 1, max: 24, message: '账号长度需要在1~24之间', trigger: 'blur' }
  ],
  href: [
    { required: true, message: '请输入链接地址', trigger: 'blur' },
    { min: 1, max: 124, message: '账号长度需要在1~124之间', trigger: 'blur' }
  ]
}
/* Link组件end */

/* Article组件start */
export const articleTableMenu = [
  { 
    title: '标题',
    propName: 'title',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '标签',
    propName: 'tags',
    isEdit: true,
    hasSlot: true,
    width: 180
  },
  { 
    title: '封面地址',
    propName: 'img',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '简介',
    propName: 'summary',
    isEdit: true,
    hasSlot: false,
    width: 180
  }
]

export const searchArticleMsg = {
  searchName: 'keywords',
  placeholderName: '关键字'
}
/* Article组件end */

/* User组件start */
export const userTableMenu = [
  { 
    title: '账号',
    propName: 'username',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '昵称',
    propName: 'nickname',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '手机',
    propName: 'phone',
    isEdit: true,
    hasSlot: false,
    width: 180
  },
  { 
    title: '性别',
    propName: 'gender',
    isEdit: true,
    hasSlot: true,
    width: 180
  },
  { 
    title: '权限',
    propName: 'isAdmin',
    isEdit: true,
    hasSlot: true,
    width: 180
  }
]

export const searchUserMsg = {
  searchName: 'keywords',
  placeholderName: '请输入账号或昵称'
}

export const userRules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 4, max: 24, message: '账号长度需要在4~24之间', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 12, message: '账号长度需要在2~12之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, max: 24, message: '密码长度需要在4~24之间', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }
  ]
}
/* User组件end */
