import {createAPI, createFormAPI} from '@/utils/request'

export const login = data => createFormAPI('/frame/login', 'post', data)
export const register = data => createAPI('/frame/register', 'post', data)
export const logout = data => createAPI('/frame/logout', 'post', data)
export const passwd = data => createAPI('/frame/passwd', 'post', data)
export const profile = data => createAPI('/frame/profile', 'post', data)
