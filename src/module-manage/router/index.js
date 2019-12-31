import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    path: '/base',
    component: Layout,
    redirect: 'noredirect',
    name: 'base',
    meta: {
      title: '后台管理',
      icon: 'component'
    },
    children: [
      {
        path: 'users',
        component: _import('manage/pages/users'),
        name: 'base-users',
        meta: { title: '用户', noCache: true }
      },
      {
        path: 'menus',
        name: 'base-menus',
        component: _import('manage/pages/menus'),
        meta: { title: '菜单', noCache: true }
      },
      {
        path: 'permissions',
        name: 'base-permissions',
        component: _import('manage/pages/permissions'),
        meta: { title: '权限', noCache: true }
      },
      {
        path: 'logs',
        name: 'base-logs',
        component: _import('manage/pages/logs'),
        meta: { title: '日志', noCache: true }
      }
    ]
  }
]
