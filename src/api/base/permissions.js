import {createAPI} from '@/utils/request'

export const list = data => createAPI('/permissions', 'get', data)
export const simple = data => createAPI('/permissions/simple', 'get', data)
export const add = data => createAPI('/permissions', 'post', data)
export const update = data => createAPI(`/permissions/${data.id}`, 'put', data)
export const remove = data => createAPI(`/permissions/${data.id}`, 'delete', data)
export const detail = data => createAPI(`/permissions/${data.id}`, 'get', data)
