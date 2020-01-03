<template>
  <el-card>
    <el-row slot="header">
      <el-button type="primary" @click="addItem">新增标签</el-button>
      <el-button type="primary" @click="$router.push('/subjects/list')">返回学科</el-button>
    </el-row>
    <el-form inline label-width="80px">
      <el-form-item label="标签名称">
        <el-input v-model="tagName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="clear">清除</el-button>
        <el-button @click="search" type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list">
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="标签名称" prop="tagName"></el-table-column>
      <el-table-column label="创建者" prop="creator"></el-table-column>
      <el-table-column label="面试题数量" prop="totals"></el-table-column>
      <el-table-column label="状态" prop="state">
        <template slot-scope="obj">{{ obj.row.state === 1 ? '启用' :'禁用' }}</template>
      </el-table-column>
      <el-table-column label="操作" width="220px">
        <template slot-scope="obj">
          <el-button type="text" size="small" @click="modify(obj.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="changeState(obj.row)">
            {{
            obj.row.state ===1 ? '禁用' :'启用'
            }}
          </el-button>
          <el-button type="text" size="small" @click="delItem(obj.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end" style="height:60px" align="middle">
      <el-pagination
        background
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        layout="total, prev, pager, next"
        :total="page.total"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
    <el-dialog :show-close="false" :visible="dialogVisible" @close="beforeClose">
      <el-form ref="myForm" :model="formData" :rules="rules" label-width="150px">
        <el-form-item label="学科名称" prop="tagName">
          <el-input v-model="formData.tagName"></el-input>
        </el-form-item>
        <el-form-item label="学科" prop="subjectID">
          <el-select v-model="formData.subjectID">
            <el-option
              v-for="item in subjects"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="end">
        <el-button type="primary" @click="btnOK">确定</el-button>
        <el-button @click="beforeClose">取消</el-button>
      </el-row>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  list,
  add,
  remove,
  detail,
  update,
  removeState
} from "../../api/hmmm/tags";
import { simple as subjectList } from "../../api/hmmm/subjects";
export default {
  data() {
    return {
      dialogVisible: false,
      list: [],
      subjects: [],
      tagName: "",
      formData: {
        tagName: "",
        subjectID: null
      },
      rules: {
        tagName: [
          { required: true, message: "标签名称不能为空", trigger: "blur" }
        ],
        subjectID: [
          { required: true, message: "学科不能为空", trigger: "blur" }
        ]
      },
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  methods: {
    beforeClose() {
      debugger;
      this.resetFields();
      this.dialogVisible = false;
    },
    async modify(id) {
      let result = await detail({ id });
      this.formData = result.data;
      this.dialogVisible = true;
    },
    async changeState(row) {
      await this.$confirm("确认改变状态吗");
      await removeState({ id: row.id, state: row.state === 1 ? 0 : 1 });
      this.getTags();
    },
    async delItem(id) {
      await this.$confirm("确认删除此标签吗");
      await remove({ id });
      this.getTags();
    },
    resetFields() {
      // this.$refs.myForm.resetFields();
      this.formData = {
        tagName: "",
        subjectID: null
      };
      this.$refs.myForm.clearValidate();
    },
    addItem() {
      this.dialogVisible = true;
    },
    async getSubject() {
      let result = await subjectList();
      this.subjects = result.data;
    },
    async btnOK() {
      await this.$refs.myForm.validate();
      this.formData.id ? await update(this.formData) : await add(this.formData);
      this.$message({
        type: "success",
        message: "操作成功"
      });
      this.getCondition();
      this.dialogVisible = false;
    },
    changePage(newPage) {
      this.page.currentPage = newPage;
      this.getCondition();
    },
    getCondition() {
      let params = {
        page: this.page.currentPage,
        pageSize: this.page.pageSize,
        tagName: this.tagName
      };
      this.getTags(params);
    },
    questionFormatter(row, column, cellValue) {
      let result = this.questionType.filter(item => item.value == cellValue);
      return result.length ? result[0].label : "未知";
    },
    search() {
      this.page.currentPage = 1;
      this.getCondition();
    },
    clear() {
      this.tagName = "";
    },
    async getTags(data) {
      let result = await list(data);
      this.list = result.data.items;
      this.page.total = result.data.counts;
    }
  },
  async created() {
    this.getTags();
    this.getSubject();
  }
};
</script>

<style lang="scss"></style>
