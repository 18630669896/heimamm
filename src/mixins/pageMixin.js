import { hasPermissionOfPoint } from '@/utils/permission'

export default {
  methods: {
    // 检查权限函数
    hasPermission(point) {
      return hasPermissionOfPoint(point)
    }
  },
  directives: {
    // 自定义检查权限点指令
    permission: {
      inserted: function(el, binding) {
        let point = binding.value
        if (!hasPermissionOfPoint(point)) {
          el.style.display = 'none'
        }
      }
    }
  }
}
