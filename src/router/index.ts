import Vue from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import { getToken, removeUser } from '@/utils/auth'
// import { getUserInfoApi} from '@/api/login'

const Layout = () => import('../components/Layout.vue')
const Home = () => import('../views/Home.vue')
// const Manage = () => import('../views/Manage.vue')
// const Topic = () => import('../views/Topic')
const Tag = () => import('../views/Tag.vue')
// const Link = () => import('../views/Link')
// const Article = () => import('../views/Article')
// const ArtClass = () => import('../views/ArtClass')
// const ArtEdit = () => import('../views/ArtEdit')
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
          requiresAuth: true
        }
      },
      {
        path: '/tag',
        component: Tag,
        meta: {
          title: '标签',
          requiresAuth: true
        }
      },
      // {
      //   path: '/manage',
      //   component: Manage,
      //   meta: {
      //     title: '页面管理',
      //     requiresAuth: true
      //   },
      //   children: [
      //     {
      //       path: 'tag',
      //       component: Tag,
      //       meta: {
      //         title: '标签',
      //         requiresAuth: true
      //       }
      //     }
      //   ]
      // },
      {
        path: '/user',
        component: User,
        meta: {
          title: '用户信息',
          requiresAuth: true
        }
      }
      // {
      //   path: '/article',
      //   component: Article,
      //   mate: {
      //     title: '文章管理',
      //     requireAuth: true
      //   },
      //   children: [
      //     {
      //       path: 'class',
      //       component: ArtClass,
      //       meta: {
      //         title: '文章分类',
      //         requiresAuth: true
      //       }
      //     },
      //     {
      //       path: 'edit',
      //       component: ArtEdit,
      //       meta: {
      //         title: '写文章',
      //         requiresAuth: true
      //       }
      //     },
      //     {
      //       path: 'edit/:id',
      //       component: ArtEdit,
      //       meta: {
      //         title: '文章编辑',
      //         requiresAuth: true
      //       }
      //     },
      //   ]
      // },
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
