<template>
  <div class="dashboard-container">
    <el-card class="app-container">
      <el-form :model="addForm"  :rules="addRules" ref="addForm" style="marginLeft:100px" label-width="80px">
        <el-form-item label="学科" prop="subjectID">
          <el-select style="width:400px" v-model="addForm.subjectID">
            <el-option v-for="item in subject" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录" prop="catalogID">
          <el-select style="width:400px" v-model="addForm.catalogID">
            <el-option v-for="item in catalog" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterpriseID">
          <el-select style="width:400px" v-model="addForm.enterpriseID">
            <el-option v-for="item in company.items" :key="item.id" :value="item.id" :label="item.shortName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="province" >
          <el-select 
          style="width:180px" 
          v-model="addForm.province" 
          @change="getCity">
            <el-option v-for="(item,index) in province" :key="index" :label="item" :value="item"></el-option>
          </el-select>
          <el-select  
          style="width:180px;margin-left:40px;" 
          v-model="addForm.city">
            <el-option v-for="(item,index) in city" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方向" prop="direction"> 
          <el-select  style="width:400px" v-model="addForm.direction" >
            <el-option v-for="(item,index) in direction" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="questionType">
          <el-radio-group  v-model="addForm.questionType">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficult">
          <el-radio-group  v-model="addForm.difficult">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="题干" prop="question">
          <quill-editor v-model="addForm.question" style="height:300px;width:600px"></quill-editor>
        </el-form-item>
        <el-form-item label="选项" style="marginTop:150px">
          <span>以下选中的选项为正确答案</span>
          <p>此处是要添加的选项</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">增加选项与答案</el-button>
        </el-form-item>
        <el-form-item label="解析视频" prop="videoURL">
          <el-input v-model="addForm.videoURL" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="答案解析" prop="answer">
          <quill-editor v-model="addForm.answer"  style="height:300px;width:600px"></quill-editor>
        </el-form-item>
         <el-form-item label="试题标签" prop="tags" style="margin:150px 0 20px 0">
          <el-select v-model="addForm.tags" style="width:400px">
            <el-option v-for="item in tag" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目备注" prop="remarks" style="marginBottom:150px">
          <quill-editor v-model="addForm.remarks" style="height:300px;width:600px"></quill-editor>
        </el-form-item>
        <el-row type="flex" justify="center" align="middle">
          <el-button type="primary" @click="submitForm('addForm')">提交</el-button>
          <el-button @click="resetForm('addForm')">清空</el-button>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {simple as subjectList} from '../../api/hmmm/subjects'
import {simple as catalogList} from '../../api/hmmm/directorys'
import {simple as tagList} from '../../api/hmmm/tags'
import {list} from '../../api/hmmm/companys'
import {provinces,citys} from '../../api/hmmm/citys'
import {difficulty,questionType,direction} from '../../api/hmmm/constants'
export default {
  
  name: 'QuestionsNew',
  data() {
    return {
      subject:[],
      catalog:[],
      company:[],
      direction,
      questionType,
      difficulty,
      tag:[],
      city:[],
      province:[],
      addForm:{
        // number:'',//试题编号
        subjectID:'',//学科
        catalogID:'',//目录
        enterpriseID:'',//企业
        city:'',//城市
        province:'',//省份
        direction:'',//方向
        questionType:'',//题型
        difficult:'',//难度
        question:'',//题干
        options:{},//选项
        videoURL:'',//解析视频
        answer:'',//答案解析
        remarks:'',//题目备注
        tags:'',//试题标签
      },
      addRules:{
         subjectID:[
           {required:true,message:'请选择学科'}
         ],
         catalogID:[
           {required:true,message:'请选择目录'}
         ],
         enterpriseID:[
           {required:true,message:'请选择企业'}
         ],
         city:[
           {required:true,message:'请选择城市'}
         ],
         province:[
           {required:true,message:'请选择省份'}
         ],
         direction:[
           {required:true,message:'请选择方向'}
         ],
         questionType:[
           {required:true,message:'请选择题型'}
         ],
         difficult:[
           {required:true,message:'请选择难度'}
         ],
         question:[
           {required:true,message:'不能为空'}
         ],
         videoURL:[
           {required:true,message:'视频地址不能为空'}
         ],
         answer:[
           {required:true,message:'答案解析不能为空'}
         ],
         remarks:[
           {required:true,message:'题目备注不能为空'}
         ],
          tags:[
           {required:true,message:'请选择试题标签'}
         ],

      }      
    }
  },
  methods:{
    // 获取简单学科列表
    getSubject(){
      subjectList().then(res =>{this.subject = res.data})
    },

    // 获取简单目录列表
    getCatalog(){
      catalogList().then(res =>{this.catalog = res.data} )
    },

    // 获取企业名称
    getCompany(){
      list().then(res => {this.company = res.data})
    },
    // 获取试题标签
    getTag(){
      tagList().then(res => {this.tag = res.data})
    },
    // 获取省份
    getProvince(){
      this.province = provinces()
    },
    // 获取城市
    getCity(e){
      this.city = citys(e)
      this.addForm.city = this.city[0]
    },
     
    // 表单验证
     submitForm() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            alert('录入成功');
          } else {
            console.log('提交失败');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.addForm.resetFields();
      }
    
  },
  created(){
    this.getSubject(),
    this.getCatalog(),
    this.getCompany(),
    this.getTag(),
    this.getCity(),
    this.getProvince()
    
  }
}
</script>

<style scoped>
</style>
