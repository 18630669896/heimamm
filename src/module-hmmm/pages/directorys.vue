<template>
  <div class="dashboard-container">
    <el-card>
      <el-row slot="header">
        <el-button type="primary">新增目录</el-button>
        <el-button type="primary">返回学科</el-button>
      </el-row>
      <el-form>
        <el-form-item label="目录名称 :">
          <el-input v-model="input" style="width:200px"></el-input>
          <span style="padding-left:10px">
            <el-button>清除</el-button>
            <el-button type="primary">搜索</el-button>
          </span>
        </el-form-item>
      </el-form>
      <el-table :data="getfrom">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="directoryName" label="目录名称"></el-table-column>
        <el-table-column prop="creator" label="创建者"></el-table-column>
        <el-table-column prop="totals" label="面试题数量"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="" label="操作"></el-table-column>
      </el-table>
      {{list}}
    </el-card>
  </div>
</template>

<script>
import { list } from "../../api/hmmm/directorys";
export default {
  name: "DirectorysList",
  data() {
    return {
      input: "",
      formpage: {
        page: 1, //当前页
        pagesize: 10, //页尺寸
        subjectID: "", //学科id
        directoryName: "", //目录名称
        state: "" // 状态1 开启 0屏蔽
      },
      getfrom: [] // 定义list接受数据
    };
  },
  methods: {
    getpage() {
      list().then(result => {
        this.getfrom = result.items;
      });
    }
  },
  created(){
    this.getpage()
  }
};
</script>

<style scoped>
</style>
