<template>
  <div class="dashboard-container">
    <el-card class="app-container">
      <el-form style="marginLeft:100px" label-width="80px">
        <el-form-item label="学科" >
          <el-select style="width:400px"></el-select>
        </el-form-item>
        <el-form-item label="目录">
          <el-select style="width:400px"></el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select style="width:400px"></el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select style="width:180px" ></el-select>
          <el-select style="width:180px;margin-left:40px;"></el-select>
        </el-form-item>
        <el-form-item label="方向">
          <el-select style="width:400px"></el-select>
        </el-form-item>
        <el-form-item label="题型">
          <el-radio-group>
            <el-radio>单选</el-radio>
            <el-radio>多选</el-radio>
            <el-radio>简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度">
          <el-radio-group>
            <el-radio>简单</el-radio>
            <el-radio>一般</el-radio>
            <el-radio>困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="题干">
          <quill-editor style="height:300px;width:600px"></quill-editor>
        </el-form-item>
        <el-form-item label="选项" style="marginTop:150px">
          <span>以下选中的选项为正确答案</span>
          <p>此处是要添加的选项</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">增加选项与答案</el-button>
        </el-form-item>
        <el-form-item label="解析视频">
          <el-input style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="答案解析">
          <quill-editor style="height:300px;width:600px"></quill-editor>
        </el-form-item>
         <el-form-item label="试题标签" style="margin:150px 0 20px 0">
          <el-select style="width:400px"></el-select>
        </el-form-item>
        <el-form-item label="题目备注" style="marginBottom:150px">
          <quill-editor style="height:300px;width:600px"></quill-editor>
        </el-form-item>
        <el-row type="flex" justify="center" align="middle">
          <el-button type="primary">提交</el-button>
          <el-button>清空</el-button>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import Vue from 'vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.component('quill-editor',quillEditor)
export default {
  
  name: 'QuestionsNew',
  data() {
    return {}
  }
}
</script>

<style scoped>
</style>
