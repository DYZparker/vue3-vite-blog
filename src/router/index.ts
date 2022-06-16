import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { checkToken } from '../http/user'
import { getUser, removeUser } from '../utils/auth'
import Crypto from '../utils/crypto'

const Layout = () => import('../components/Layout.vue')
const Home = () => import('../views/Home.vue')
const SiderManage = () => import('../views/SiderManage.vue')
const Tag = () => import('../views/Tag.vue')
const Link = () => import('../views/Link.vue')
const Articles = () => import('../views/Articles.vue')
const ArticleManage = () => import('../views/ArticleManage.vue')
const ArticleEdit = () => import('../views/ArticleEdit.vue')
const User = () => import('../views/User.vue')
const Login = () => import('../views/Login.vue')

const myCrypto = new Crypto()
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home,
        meta: {
          title: '首页',
          requiresAuth: false
        }
      },
      {
        path: '/sider',
        component: SiderManage,
        meta: {
          title: '侧栏管理',
          requiresAuth: false
        },
        children: [
          {
            path: 'tag',
            component: Tag,
            meta: {
              title: '标签',
              requiresAuth: false
            }
          },
          {
            path: 'link',
            component: Link,
            meta: {
              title: '链接',
              requiresAuth: false
            }
          }
        ]
      },
      {
        path: '/article',
        component: ArticleManage,
        meta: {
          title: '文章管理',
          requiresAuth: false
        },
        children: [
          {
            path: 'classify',
            component: Articles,
            meta: {
              title: '列表',
              requiresAuth: false
            }
          },
          {
            path: 'edit',
            component: ArticleEdit,
            meta: {
              title: '新增',
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: '/user',
        component: User,
        meta: {
          title: '用户管理',
          requiresAuth: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导航守卫检测token与用户权限
router.beforeEach(async (to, from) => {
  const user = myCrypto.decryptCBC(getUser())
  const { requiresAuth } = to.meta

  if(to.path === '/login') {
    removeUser() 
    return
  }else if(from.path === '/login') {
    return
  }else {
    if(user.username) {
      const res = await checkToken({username: user.username})
      if(res.data.code === 200) {
        // 查看路由是否需要管理员权限
        if(!user.isAdmin && requiresAuth){
          ElMessage.error('请用管理员权限登录，方可查看！')
          return false
        }else{
          return
        }
      }else {
        return '/login'
      }
    }else {
      return '/login'
    }
  }
})

export default router
