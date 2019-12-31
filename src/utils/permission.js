import store from '@/store'

// 用户 roles
function getUserRoles() {
  let userRoles = store.getters.roles // 角色名称 array
  if (userRoles === null || userRoles === undefined || userRoles.length <= 0) {
    // 安全代码
    return ['']
  }
  return userRoles
}

// 根据路由名字检查角色权限
export function hasPermissionOfRouteName(routeName) {
  let userRoles = getUserRoles()
  return userRoles.menus.some(menu => menu === routeName)
}

// 根据权限点代码检查权限
export function hasPermissionOfPoint(pointCode) {
  let userRoles = getUserRoles()
  return userRoles.points.some(point => point === pointCode)
}
