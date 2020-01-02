<template>
  <div class="dashboard-container">
    <el-card>
      <!-- 数据主体 -->
      <template class="dashboardBody">
        <el-table :data="topicList" style="width: 100%">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="userName" label="用户名"></el-table-column>
          <el-table-column prop="questionIDs" label="试题ID"></el-table-column>
          <el-table-column prop="progressOfAnswer" :formatter="databai" label="答题进度"></el-table-column>
          <el-table-column prop="accuracyRate" :formatter="databai" label="正确率"></el-table-column>
          <el-table-column prop="totalSeconds" label="答题总耗时"></el-table-column>
          <el-table-column prop="questionType" label="组题类型/详情"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="obj">
              <a @click="delData(obj.row)" href="javascropt:;" style="font-size:12px;color:blue">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-row type="flex" justify="center" align="middle" style="height:80px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.counts"
          :current-page="page.page"
          :page-size="page.pagesize"
          @current-change='changeCurrent'>
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { randoms , removeRandoms } from '../../api/hmmm/questions'
export default {
  name: "QuestionsRandoms",
  data() {
    return {
      // 组题列表的信息
      topicList:[
        // {id:''},//编号
        // {addTime:''},//组题时间
        // {userName:''},//用户名
        // {questionIDs:[]},//试题ID
        // {progressOfAnswer:0},//答题进度
        // {accuracyRate:0},//正确率
        // {totalSeconds:0},//答题总耗时秒
        // {questionType:''},//组题类型
      ],
      page:{
        page:1,//当前页数
        pagesize:10,//每页的数量
        counts:0//总页数
      }
    };
  },
  methods:{
    // 格式化百分比   表格中的格式化用formatter  它是个函数 参数有row column cellValue,index
    databai(row,column,cellValue,index){
      // console.log(row,column,cellValue,index);
      return cellValue + '%'
    },
    // 删除数据
    delData(row){
      this.$confirm('你确定要删除么').then(()=>{
        // console.log(row.id);
        removeRandoms(row.id).then(()=>{
          this.$message({
            type:'success',
            message:'删除成功'
          })
          this.getTopic()
        })
      })
    },
    // 改变页码
    changeCurrent(newpage){

      // 改变当前页
      this.page.page=newpage
      // 重新请求数据
      this.getTopic()
    },
    // 获取数据
    getTopic(){
      let params={
        page:this.page.page,
        pagesize:this.page.pagesize
      }
      randoms({params}).then(res=>{
        // console.log(res.data.items);
        // 加载数据
        this.topicList=res.data.items
        // 获取总页数
        this.page.counts=res.data.counts
      })
    }
  },
  created(){
    // 获取数据
    this.getTopic()
  }
};
</script>

<style scoped>

</style>
