/*
 * @Author: taoshiwei
 * @Date: 2019-04-09 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:49:44
 *
 * 题库
 */

import { createAPI } from '@/utils/request'

// 基础题库列表
export const list = data => createAPI('/questions', 'get', data)

// 基础题库详情
export const detail = data => createAPI(`/questions/${data.id}`, 'get', data)

// 批量导入题
export const batch = data => createAPI('/questions/batch', 'post', data)

// 基础题库添加
export const add = data => createAPI('/questions', 'post', data)

// 基础题库修改
export const update = data => createAPI(`/questions/${data.id}`, 'put', data)

// 基础题库删除
export const remove = data => createAPI(`/questions/${data.id}`, 'delete', data)

// 精选题库列表
export const choice = data => createAPI('/questions/choice', 'get', data)

// 精选题库上下架
export const choicePublish = data =>
  createAPI(`/questions/choice/${data.id}/publish`, 'post', data)

// 试题审核
export const choiceCheck = data =>
  createAPI(`/questions/choice/${data.id}/check`, 'post', data)

// 试题审核意见列表
export const auditOpinions = data =>
  createAPI(`/questions/${data.id}/auditOpinions`, 'get', data)

// 出题记录
export const setRecords = data =>
  createAPI(`/questions/${data.id}/setRecords`, 'get', data)

// 组题列表
export const randoms = data => createAPI(`/questions/randoms`, 'get', data)

// 组题列表删除
export const removeRandoms = data =>
  createAPI(`/questions/randoms/${data.id}`, 'delete', data)
