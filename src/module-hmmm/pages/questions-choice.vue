<template>
  <!-- <div class="dashboard-container">
    <div class="app-container">题库-精选</div> -->
    <el-card>
      <template slot="header">
      <el-button @click="tiaozhuan">新增试题</el-button>
      <el-button>批量导入</el-button>
      </template>
  <div class="conditions">
    <span>
      学科
      <el-select v-model="conditions.subject.value" placeholder="请选择">
        <el-option v-for="item in conditions.subject" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      </span>

    <span>
      状态
      <el-select v-model="conditions.status.value">
        <el-option v-for="item in conditions.status" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </span>

    <span>
      难度
      <el-select v-model="conditions.difficulty.value">
        <el-option v-for="item in conditions.difficulty" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </span>

    <span>
      方向
      <el-select v-model="data.direction">
        <el-option v-for="(item,idx) in conditions.direction" :key="idx" :label="item" :value="item"></el-option>
      </el-select>
    </span>

    <span>
      试题类型
      <el-select v-model="conditions.questionType.value">
        <el-option v-for="item in conditions.questionType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </span><br/>

    <span>
      城市
      <el-select style="margin-right:5px" v-model="data.province" @change="cityChange">
        <el-option v-for="(item,idx) in conditions.provinces" :key="idx" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="data.city" placeholder="请选择">
        <el-option v-for="(item,idx) in conditions.cities" :key="idx" :label="item" :value="item"></el-option>
      </el-select>
    </span>   
  </div>
  <div class="inps">
     <span>
      标签：<el-input style="width:250px "></el-input>
    </span>
     <span>
      录入人：<el-input style="width:250px"></el-input>
    </span>
     <span>
      关键字：<el-input style="width:250px"></el-input>
    </span><br/>
     <span>
      题目备注：<el-input style="width:250px"></el-input>
    </span>
     <span>
      二级目录：<el-input style="width:250px"></el-input>
    </span>
     <span>
      企业简称：<el-input style="width:250px"></el-input>
    </span>
    
  </div>

   <el-tabs v-model="data.chkState" type="card">
    <el-tab-pane label="全部" name="0"></el-tab-pane>
    <el-tab-pane label="待审核" name="1"></el-tab-pane>
    <el-tab-pane label="已审核" name="2"></el-tab-pane>
  </el-tabs>

  <el-table :data="list">
    <el-table-column prop="id" label="序号"></el-table-column>
    <el-table-column prop="number" label="试题编号"></el-table-column>
    <el-table-column prop="subjectName" label="学科"></el-table-column>
    <el-table-column prop="questionType" label="题型"></el-table-column>
    <el-table-column prop="question" label="题干"></el-table-column>
    <el-table-column prop="addDate" label="录入时间">
      <template slot-scope="sb">
        {{sb.row.addDate|parseTimeByString}}
      </template>
    </el-table-column>
    <el-table-column prop="creator" label="录入人"></el-table-column>
    <el-table-column prop="difficulty" label="难度"></el-table-column>
    <el-table-column prop="" label="使用次数"></el-table-column>
    <el-table-column prop="chkState" label="审核状态">
      <template slot-scope="obj">{{obj.row.chkState===0?'待审核':'通过'}}</template>
    </el-table-column>
    <el-table-column prop="chkRemarks" label="审核意见"></el-table-column>
    <el-table-column prop="chkUser" label="审核人"></el-table-column>
    <el-table-column prop="publishState" label="发布状态">
       <template slot-scope="obj">{{obj.row.publishState===0?'待发布':'已发布'}}</template>
    </el-table-column>
    <el-table-column prop="" label="操作">
        <el-button type="text" size="small" @click="delMsg">删除</el-button>
        <el-button type="text" size="small" @click="editMsg">修改</el-button>
    </el-table-column>
    
  </el-table>
  <el-row type="flex" justify="center">
  <el-pagination
    layout="prev, pager, next"
    :total="page.total"
    :current-page="page.page"
    :page-size="page.pagesize"
    @current-change="currentChange">
  </el-pagination>
  </el-row>
    </el-card>
  <!-- </div> -->
</template>

<script>
// var obj1 = {a:1,b:2}
// var obj2 = {c:3,d:4}
// var obj = {z:11,k:22,...obj2}
// console.log(obj);

import {choice} from '../../api/hmmm/questions'
import {simple as subjectList} from '../../api/hmmm/subjects'
import {status,difficulty,questionType,direction} from '../../api/hmmm/constants'
import {provinces,citys} from '../../api/hmmm/citys'
// import{status} from '../../api/hmmm/articles'
import {parseTimeByString} from '../../filters'

export default {
  name: 'QuestionsChoice',
  data() {
    return {
      list:[],
      page:{
        pagesize:5,
        total:0,
        Page:1
      },
      data:{subjectID:null,difficulty:null,questionType:null,tags:null,province:null,city:null,keyword:null,remarks:null,shortName:null,direction:null,creatorID:null,catalogID:null,chkState:"2"},
      conditions:{subject:'',status,difficulty,questionType,provinces:'',cities:'',direction},
      
    }
  },
  watch:{
    data:{
    handler(){
      console.log('触发了');
      
     this.getMsg()
      },
      deep:true
    }
  },
  methods:{
    // async getStatus(){
    //   let res = await status()
    //   this.conditions.status=res
    //   console.log(res);
      
    // },
  
    getDirection(){
      this.conditions.direction=this.conditions.direction
      // console.log(this.conditions.direction);
      
    },
    cityChange(newVal){
      this.conditions.cities=citys(newVal)
      // console.log(this.conditions.cities);
      
    },
    getProvinces(){
    this.conditions.provinces=provinces()
    this.conditions.provinces=this.conditions.provinces
    // console.log(this.conditions.provinces);
    
    },
   async getMsg(){
    //  let params = {this.page,...this.data}
    // let params = {page:this.page.page,pagesize:this.page.pagesize,...this.data}
  let res= await choice(this.page)
    this.list=res.data.items
    // this.list=this.list.reverse()
    console.log(this.list);
    
    this.page.total=res.data.counts
    },
    async getSubjectList(){
    let res = await subjectList()
      this.conditions.subject=res.data
      
     
    },
    currentChange(newpage){
      this.page.page=newpage
      this.getMsg()
    },
    tiaozhuan(){
      this.$router.push('/questions/new')
    }
  },
  created(){
  this.getMsg()
  this.getSubjectList()
  this.getProvinces()
  this.getDirection() 
  // this.getStatus()
    
  }
}
</script>

<style scoped lang="scss">
.conditions{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  // justify-content:space-around;
  span{
    margin-bottom: 20px
  }
}
.inps{
  display: flex;
  // justify-content: space-around;
  flex-wrap: wrap
}


// 1. 如果在此处 scoped 当前组件下生效样式
// 2. 在style中的所有选择器 编译的时候会自动带上属性选择器
// 3. .box{} ===> .box[data-v-2c9827a4]{} 交集选择器
// 4. 在当前组件下暴露的标签都会加上 data-v-2c9827a4 属性
// 5. 但是如果是组件，其他组件内部的标签是不会加上这个属性 意味写组件内部的样式是不会生效的
// 6. 其他组件的样式都不会生效
</style>
