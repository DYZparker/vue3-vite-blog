import Vue from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import { getToken, removeUser } from '@/utils/auth'
// import { getUserInfoApi} from '@/api/login'

const Layout = () => import('../components/Layout.vue')
const Home = () => import('../views/Home.vue')
const SiderManage = () => import('../views/SiderManage.vue')
// const Topic = () => import('../views/Topic')
const Tag = () => import('../views/Tag.vue')
const Link = () => import('../views/Link.vue')
const Articles = () => import('../views/Articles.vue')
const ArticleManage = () => import('../views/ArticleManage.vue')
const ArticleEdit = () => import('../views/ArticleEdit.vue')
const User = () => import('../views/User.vue')
const Login = () => import('../views/Login.vue')

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
          showlevel: 1,
          requiresAuth: true
        }
      },
      {
        path: '/auth',
        component: Tag,
        meta: {
          title: '基本信息',
          showlevel: 1,
          requiresAuth: true
        }
      },
      {
        path: '/sider',
        component: SiderManage,
        meta: {
          title: '侧栏管理',
          showlevel: 1,
          requiresAuth: true
        },
        children: [
          {
            path: 'tag',
            component: Tag,
            meta: {
              title: '标签',
              showlevel: 2,
              requiresAuth: true
            }
          },
          {
            path: 'link',
            component: Link,
            meta: {
              title: '链接',
              showlevel: 2,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: '/article',
        component: ArticleManage,
        meta: {
          title: '文章管理',
          showlevel: 1,
          requiresAuth: true
        },
        children: [
          {
            path: 'classify',
            component: Articles,
            meta: {
              title: '分类',
              showlevel: 2,
              requiresAuth: true
            }
          },
          {
            path: 'edit',
            component: ArticleEdit,
            meta: {
              title: '编辑',
              showlevel: 2,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: '/user',
        component: User,
        meta: {
          title: '用户信息',
          showlevel: 1,
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

//导航守卫检测token
// router.beforeEach((to, from, next) => {
//   let token = getToken()
//   if(token) {
//     getUserInfoApi().then(response => {
//       const res = response.data.data.res
//       if(res.code === 2000) {
//         return next()
//       }else {
//         if(to.path === '/login') {
//           removeUser() 
//           next()
//         }else {
//           next('/login')
//         }
//       }
//     })
//   }else {
//     if(to.path === '/login') {
//       next()
//     }else {
//       next('/login')
//     }
//   }
// })

export default router
