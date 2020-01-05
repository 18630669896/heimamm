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
        <el-form-item label="城市" prop="city" >
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
          <el-radio-group  v-model="addForm.questionType"  @change="changeType" >
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-radio-group  v-model="addForm.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="题干" prop="question">
          <quill-editor v-model="addForm.question" style="height:300px;width:600px"></quill-editor>
        </el-form-item>
        <el-form-item v-if="addForm.questionType!==3" label="选项" style="marginTop:150px">
          <span>以下选中的选项为正确答案</span>
        <el-form-item v-for="(item,index) in addForm.options" :key="index">
          <!-- 单选 -->
          <el-radio-group @change="changeOption"   v-if="addForm.questionType===1" v-model="selectOption">
            <el-radio :label="item.code" :value="item.code" >
              {{item.code}}
            </el-radio>
          </el-radio-group>
          <!-- 多选 -->
          <template v-if="addForm.questionType === 2">
            <el-checkbox v-model="item.isRight" :label="item.code" :value="item.code">
            {{item.code}}
            </el-checkbox>
          </template>
          <el-input style="width:300px;margin:10px 20px;" v-model="item.title"></el-input ><el-button @click="delOptions(index)">删除该选项</el-button>
        </el-form-item>
        </el-form-item>
        <el-form-item v-if="addForm.questionType!==3">
          <el-button type="primary" @click="addQuestion">增加选项与答案</el-button>
        </el-form-item>
        <el-form-item label="解析视频" prop="videoURL" :style="{marginTop:addForm.questionType===3?'150px':'0'}">
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
import {add} from '../../api/hmmm/questions'
import {simple as subjectList} from '../../api/hmmm/subjects'
import {simple as catalogList} from '../../api/hmmm/directorys'
import {simple as tagList} from '../../api/hmmm/tags'
import {list} from '../../api/hmmm/companys'
import {provinces,citys} from '../../api/hmmm/citys'
import {difficultyy,questionType,direction} from '../../api/hmmm/constants'
export default {
  
  name: 'QuestionsNew',
  data() {
    return {
      codeStr:'abcdefghijklmnopqrstuvwxyz',
      subject:[],
      catalog:[],
      company:[],
      direction,
      tag:[],
      city:[],
      province:[],
      selectOption:'',
      addForm:{
        // number:'',//试题编号
        subjectID:null,//学科
        catalogID:null,//目录
        enterpriseID:null,//企业
        city:null,//城市
        province:null,//省份
        direction:'',//方向
        questionType:1,//题型
        difficulty:1,//难度
        question:'',//题干
        options:[],//选项
        videoURL:'',//解析视频
        answer:'',//答案解析
        remarks:'',//题目备注
        tags:null,//试题标签
      },
      // 表单自动校验规则
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
         difficulty:[
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
    // 删除该选项
    async delOptions(index){
      await this.$confirm('确定要删除该选项？')
      this.addForm.options.splice(index,1)
    },
    // 单选时改变选项
    changeOption(){
      this.addForm.options = this.addForm.options.map(item =>{
        item.code === this.selectOption? (item.isRight=true):(item.isRight=false)
        return item;
      })

    },  
    // 改变题目类型 
    changeType(){
      this.addForm.options = this.addForm.options.map(item =>{
        item.isRight = false
        item.title = ''
        return item
      })

    }, 
    // 增加题目
    addQuestion(){
      this.addForm.options.code = this.codeStr.charAt(this.addForm.options.length).toUpperCase()
      this.addForm.options.push({
        code:this.addForm.options.code,
        title:'',
        isRight:false})
    },
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
     
    // 提交表单验证
     async submitForm() {
       await this.$refs.addForm.validate()
       this.addForm.direction=this.addForm.direction.toString()
       this.addForm.tags=this.addForm.tags.toString()
       this.addForm.difficulty=this.addForm.difficulty.toString()
       this.addForm.questionType=this.addForm.questionType.toString()
       await add(this.addForm)
      //  await this.$refs.addForm.validate((isOK) => {
      //     if (isOK) {
      //       alert('录入成功');
      //     } else {
      //       console.log('提交失败');
      //       return false;
      //     }
      //   });
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
    // this.addQuestion()
  }
}
</script>

<style scoped>
</style>
