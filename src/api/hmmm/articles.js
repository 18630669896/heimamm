/*
 * @Author: taoshiwei
 * @Date: 2019-04-09 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 15:16:53
 *
 * 文章
 */

import { createAPI } from '@/utils/request'

// 文章列表
export const list = data => createAPI('/articles', 'get', data)

// 文章简单列表
export const simple = data => createAPI('/articles/simple', 'get', data)

// 文章详情
export const detail = data => createAPI(`/articles/${data.id}`, 'get', data)

// 文章添加
export const add = data => createAPI(`/articles`, 'post', data)

// 文章修改
export const update = data => createAPI(`/articles/${data.id}`, 'put', data)

// 文章删除
export const remove = data => createAPI(`/articles/${data.id}`, 'delete', data)

// 文章状态
export const state = data =>
  createAPI(`/articles/${data.id}/state`, 'post', data)
