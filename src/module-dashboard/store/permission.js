import { asyncRouterMap, constantRouterMap } from '@/router'
import { hasPermissionOfRouteName } from '@/utils/permission'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        
        /// 动态路由
        /// 内部函数递归路由 筛选需要的数据
        // function filterAsyncRouter(routers) {
        //   return routers.filter(route => {
        //     if (hasPermissionOfRouteName(route.name)) {
        //       if (route.children && route.children.length) {
        //         route.children = filterAsyncRouter(route.children)
        //       }
        //       return true
        //     } else {
        //       return false
        //     }
        //   })
        // }
        // let accessedRouters = filterAsyncRouter(asyncRouterMap)
        // commit('SET_ROUTERS', accessedRouters)

        commit('SET_ROUTERS', asyncRouterMap)
        resolve()
      })
    }
  }
}

export default permission
