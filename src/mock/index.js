import Mock from 'mockjs'
import TableAPI from './table'
import ArticlesAPI from './articles'
import DetailAPI from './detailTable'
import QuestionsAPI from './questions'

Mock.setup({
  timeout: '1000'
})

Mock.mock(/\/table\/list\.*/, 'get', TableAPI.list)
Mock.mock(/\/articles\/list\.*/, 'get', ArticlesAPI.list)
Mock.mock(/\/details\/list\.*/, 'get', DetailAPI.list)

Mock.mock(/\/questions\/randoms\.*/, 'get', QuestionsAPI.list)
Mock.mock(/\/questions\/randoms\.*/, 'delete', QuestionsAPI.delete)
