import {createAPI} from '@/utils/request'

export const list = data => createAPI('/logs/', 'get', data)
