<template>
  <div class="dashboard-container">
    <el-card>
      <el-row slot="header">
        <el-button type="primary" @click="handleClose()">新增目录</el-button>
        <el-button type="primary" @click="subjects">返回学科</el-button>
      </el-row>
      <el-form inline>
        <el-form-item label="目录名称 :">
          <el-input v-model="searchForm.directoryName" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.state" style="margin-left:20px">
          <el-option
            v-for="item in status"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
        </el-form-item>
       <el-form-item>
          <span style="padding-left:10px">
            <el-button @click="removeclear">清除</el-button>
            <el-button type="primary" @click="search">搜索</el-button>
          </span>
       </el-form-item>
      </el-form>
      <el-table :data="getfrom">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="directoryName" label="目录名称"></el-table-column>
        <el-table-column prop="creator" label="创建者"></el-table-column>
        <el-table-column prop="addDate" label="创建日期" align="center">
          <template slot-scope="obj">{{ obj.row.addDate | parseTimeByString}}</template>
        </el-table-column>
        <el-table-column prop="totals" label="面试题数量" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" >
          <template slot-scope="obj">{{obj.row.state===1?'开启':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="obj">
          <el-button size="small" type="text" @click="handleClose(obj.row.id)">修改</el-button>
          <el-button size="small" type="text" >{{obj.row.state===1?'禁用':'开启'}}</el-button>
          <el-button size="small" type="text" @click="remove(obj.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
     <el-row type="flex" justify="center" align="middle" style="height:80px"><span>共{{page.counts}}条</span>
      <el-pagination background @current-change='changepage' :current-page='page.page' :page-size='page.pagesize'  :total="page.counts">
        </el-pagination>
        </el-row> <!-- 分页组件 -->
    </el-card>
    
    <el-dialog :visible="dialogVisible" @close="handleOpen" title="提示">
      <!-- 弹层主体内容 -->
        <el-form ref="myform" :model="directory" :rules="rules">
          <el-form-item prop="directoryName" label="目录名称：">
            <el-input style="width:60%" v-model="directory.directoryName"></el-input>
          </el-form-item>
          <el-form-item prop="subjectID" label="学科目录：">
            <el-select  v-model="directory.subjectID">
              <el-option  v-for="item in list"
            :key="item.value"
            :value="item.value"
            :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="end" >
              <el-button type="primary" @click="handleOpen" size="small">取消</el-button>
            <el-button type="primary" @click="submitForm" size="small">确定</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>
<script>
import { list, update,remove,detail,add } from "../../api/hmmm/directorys";
import {parseTimeByString} from '../../filters';
import { status } from "../../api/hmmm/constants";
import {simple} from '../../api/hmmm/subjects';
export default {
  // name: "DirectorysList",
  data() {
    return {
      status, // 状态数据
      // 搜索对象
      searchForm: {
        directoryName: "", // 目录名称
        state: null // 默认没状态
      },
      // 校验规则
       rules: {
        subjectID: [
          { required: true, message: "学科id不能为空", trigger: "blur" }
        ],
        directoryName: [
          { required: true, message: "目录名称不能为空", trigger: "blur" }
        ]
      },
      // 定义接受目录修改的名称和学科 
      // 新增接口
      directory:{
        subjectID: null,
        directoryName: ""
      },
      page:{
        counts:0,//总记录数
        pagesize:5, //页大小
         pages:0, //总页数
         page:1//当前页
      },//接受页面分页数据
      getfrom: [], // 定义list接受数据
      dialogVisible: false,
      test:'',
  list:[] //学科列表
    }
  
  },
  methods: {
    //返回学科列表
    subjects(){
      this.$router.push('/subjects/list')
    },
    //修改数据
    removedata(id){
      update().then(result=>{
        this.getpage()
      })
    },
    // 学科列表 加载数据
    sublist(){
      simple().then(result=>{
        console.log(result.data)
        this.list=result.data
      })
    },
    //表单校验
     async submitForm(){
      await this.$refs.myform.validate();
      // 调用新增接口
      this.directory.id ? await update(this.directory) // 是由id的
        : await add(this.directory); // id存在调用修改接口 否则调用新增接口
      //  操作成功
      this.$message({ type: "success", message: "操作成功" });
      // 重置数据
      this.getpage(this.searchForm); // 应该带状态查询
      this.btnCancel();
    },
     btnCancel() {
      this.directory = {
        subjectID: null,
        directoryName: ""
      };
      this.dialogVisible = false; // 关闭弹层
    },
    //搜索列表
    search() {
      // 搜索方法
      this.page.page =1; // 搜索回到第一页
      this.getpage(this.searchForm);
    },
    //清空搜索栏
    removeclear(){
      this.searchForm={
        directoryName: "", // 目录名称
        state: null // 默认没状态
      }
    },
    //删除
    remove(id){
      // console.log(id)
      remove({id}).then(result=>{
      this.getpage() // 重新获取数据
      }) //删除数据
    },
    //当前页发生变化
    changepage(page){
    this.page.page=page
     this.getpage()
    },
    //打开弹层 获取我的数据
    async handleClose(id) {
      if(id){
        let result= await detail({id})
       // console.log(result)
        this.directory=result.data
      }else{
        this.directory={subjectID:null,directoryName:''};
      }
       this.dialogVisible = true;
    
    },
    //关闭弹层
    handleOpen() {
      this.dialogVisible = false;
    },
    getpage(data) {
      list({page:this.page.page,pagesize:this.page.pagesize,...data}).then(result => {
        // console.log(result.data)
        // this.page= result.data
        this.getfrom = result.data.items;
        this.page.counts=result.data.counts
      });
    },
    directorys(val) {
      console.log(val);
      let data = {
        id: val.id,
        subjectID: val.creatorID,
        directoryName: val.directoryName
      };
      console.log(data);
      update(data).then(result => {
        console.log(result);
      });
    } //修改列表
  },
  created() {
    this.getpage();
    this.sublist()
  }
};
</script>

<style scoped>
</style>
