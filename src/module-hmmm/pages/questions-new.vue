<template>
  <div class="dashboard-container">
    <el-card class="app-container">
      <el-form :model="addForm"  :rules="addRules" ref="addForm" style="marginLeft:100px" label-width="80px">
        <el-form-item label="学科" prop="subject">
          <el-select style="width:400px" v-model="addForm.subjectID">
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录" prop="catalog">
          <el-select style="width:400px" v-model="addForm.catalogID">

          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select style="width:400px" v-model="addForm.enterpriseID">
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city" >
          <el-select style="width:180px" v-model="addForm.city" ></el-select>
          <el-select prop="province" style="width:180px;margin-left:40px;" v-model="addForm.province"></el-select>
        </el-form-item>
        <el-form-item label="方向" prop="direction"> 
          <el-select  style="width:400px" v-model="addForm.direction" ></el-select>
        </el-form-item>
        <el-form-item label="题型" prop="questionType">
          <el-radio-group  v-model="addForm.questionType">
            <el-radio>单选</el-radio>
            <el-radio>多选</el-radio>
            <el-radio>简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficult">
          <el-radio-group  v-model="addForm.difficult">
            <el-radio>简单</el-radio>
            <el-radio>一般</el-radio>
            <el-radio>困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="题干" prop="question">
          <quill-editor v-model="addForm.question" style="height:300px;width:600px"></quill-editor>
        </el-form-item>
        <el-form-item label="选项" style="marginTop:150px">
          <span>以下选中的选项为正确答案</span>
          <p>此处是要添加的选项{{subject}}</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">增加选项与答案</el-button>
        </el-form-item>
        <el-form-item label="解析视频" prop="video">
          <el-input v-model="addForm.videoURL" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="答案解析" prop="answer">
          <quill-editor v-model="addForm.answer"  style="height:300px;width:600px"></quill-editor>
        </el-form-item>
         <el-form-item label="试题标签" prop="tags" style="margin:150px 0 20px 0">
          <el-select v-model="addForm.tags" style="width:400px"></el-select>
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
import {simple} from '../../api/hmmm/subjects'
export default {
  
  name: 'QuestionsNew',
  data() {
    return {
      subject:[],
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
         subject:[
           {required:true,message:'请选择学科'}
         ],
         catalog:[
           {required:true,message:'请选择目录'}
         ],
         enterprise:[
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
         video:[
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
      simple().then(res =>{
        console.log('简单学科'+res);
        
        this.subject = res.data})
    },
    // 表单验证
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    
  },
  created(){
    getSubject()
    
  }
}
</script>

<style scoped>
</style>
