<template>
  <el-card>
    <el-button @click="$router.push('/questions/new')" type="primary">新增试题</el-button>
    <el-button type="primary">批量导入</el-button>
    <el-form :inline="true">
      <el-form-item class="formList" label="学科">
        <el-select v-model="formData.subjectID" placeholder="请选择">
          <el-option
            v-for="item in simpleList"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="formList" label="难度">
        <el-select v-model="formData.difficulty" placeholder="请选择">
          <el-option
            v-for="item in difficulty"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="formList" label="试题类型">
        <el-select v-model="formData.questionType" placeholder="请选择">
          <el-option
            v-for="item in questionType"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="formList" label="标签">
        <el-select v-model="formData.tags" placeholder="请选择">
          <el-option v-for="item in tags" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="formList" label="城市">
        <el-select v-model="formData.province" placeholder="请选择">
          <el-option v-for="(item,index) in datas" :label="item.city" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="formList" label="区域">
        <el-select v-model="formData.city" placeholder="请选择">
          <el-option v-for="(item,index) in datas" :label="item.area" :key="index"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="formList" label="关键字">
        <el-input v-model="formData.keyword" placeholder="请输入题目编号/题干"></el-input>
      </el-form-item>
      <el-form-item class="formList" label="题目备注">
        <el-input v-model="formData.remarks" placeholder="请输入题目备注"></el-input>
      </el-form-item>
      <el-form-item class="formList" label="企业简称">
        <el-input v-model="formData.shortName" placeholder="请输入企业简称"></el-input>
      </el-form-item>
      <el-form-item class="formList" label="方向">
        <el-select v-model="formData.direction" placeholder="请选择">
          <el-option v-for="(item,index) in direction" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="formList" label="录入人">
        <el-select v-model="formData.creatorID" placeholder="请选择">
          <el-option v-for="item in users" :key="item.id" :label="item.username" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="formList" label="二级目录">
        <el-input v-model="formData.catalogID" placeholder="请输入二级目录"></el-input>
      </el-form-item>
      <el-button>清除</el-button>
      <el-button type="primary">搜索</el-button>
    </el-form>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="序号" width="80"></el-table-column>
      <el-table-column prop="number" label="试题编号" width="100"></el-table-column>
      <el-table-column prop="subjectID" label="学科" width="100"></el-table-column>
      <el-table-column
        :formatter="questionTypeFormatter"
        prop="questionType"
        label="题型"
        width="100"
      ></el-table-column>
      <el-table-column prop="question" label="题干" width="100"></el-table-column>
      <el-table-column prop="addDate" label="录入时间" width="180">
        <template slot-scope="obj">{{obj.row.addDate | parseTimeByString}}</template>
      </el-table-column>
      <el-table-column :formatter="questionDifficulty" prop="difficulty" label="难度" width="80"></el-table-column>
      <el-table-column prop="direction" label="使用次数" width="80"></el-table-column>
      <el-table-column prop="creator" label="录入人" width="100"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="obj">
          <el-button type="text">预览</el-button>
          <el-button @click="modifyQuestion(obj.row.id)" type="text">修改</el-button>
          <el-button @click="delQuestion(obj.row.id)" type="text">删除</el-button>
          <el-button type="text">加入精选</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" style="margin-top:10px" justify="end">
      <el-pagination
        background
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        layout="prev, pager, next"
        :total="page.total"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import { difficulty, questionType, direction } from "../../api/hmmm/constants";
import { list as questionList, remove, update } from "../../api/hmmm/questions";
import { simple as simpleList } from "../../api/hmmm/subjects";
import { simple as TagsList } from "../../api/hmmm/tags";
import { datas } from "../../api/hmmm/citys";
import { simple as userList } from "../../api/base/users";
// import { log } from "util";
export default {
  data() {
    return {
      list: [],
      simpleList: [],
      difficulty,
      questionType,
      tags: [],
      datas,
      direction,
      users: [],
      formData: {
        subjectID: "",
        difficulty: "",
        questionType: "",
        tags: "",
        province: "",
        city: "",
        direction: "",
        keyword: "",
        remarks: "",
        shortName: "",
        catalogID: "",
        creatorID: ""
      },
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    };
  },
  methods: {
    //修改基础题库
    async modifyQuestion(id) {
      await update({ id });
      this.$router.push("/questions/new/${id}");
    },
    //删除基础题库
    async delQuestion(id) {
      await this.$confirm("您确定要删除吗?");
      await remove({ id });
      this.$message({ type: "success", message: "删除成功" });
      this.getQuestions();
    },
    // 改变页码
    changePage(newPage) {
      this.page.currentPage = newPage;
      this.getQuestions();
    },
    // getCondition() {
    //   let params = {
    //     page: this.page.currentPage,
    //     pagesize: this.page.pageSize,
    //     ...formData
    //   };
    //   this.questionList(params);
    // },
    async getQuestions() {
      let result = await questionList({
        page: this.page.currentPage,
        pagesize: this.page.pageSize
      });
      this.list = result.data.items;
      this.page.total = result.data.counts;
      // console.log(this.page.total);
    },
    async getSimpleList() {
      let result = await simpleList();
      this.simpleList = result.data;
    },
    async getTagsList() {
      let result = await TagsList();
      this.tags = result.data;
    },
    async getUserList() {
      let result = await userList();
      this.users = result.data;
    },
    questionTypeFormatter(row, column, cellValue) {
      let result = this.questionType.filter(item => this.value == cellValue);
      return result.length ? result[0].label : "未知";
    },
    questionDifficulty(row, column, cellValue) {
      let result = this.difficulty.filter(item => {
        this.value == cellValue;
        console.log(this.value);
      });
      return result.length ? result[0].label : "未知";
    }
  },
  created() {
    this.getQuestions();
    this.getSimpleList();
    this.getTagsList();
    this.getUserList();
  }
};
</script>

<style lang="scss" scoped>
.formList {
  margin-top: 10px;
  // width: 15%;
}
</style>
