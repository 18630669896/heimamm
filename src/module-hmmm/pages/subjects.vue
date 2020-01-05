<template>
  <!-- 放置一个容器 -->
  <el-card>
    <el-row slot="header">
      <el-button type="primary" @click="dialogVisible = true"
        >新增学科</el-button
      >
    </el-row>
    <el-form inline>
      <el-form-item label="学科名称">
        <el-input v-model="searchForm.subjectName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="clear">清除</el-button>
        <el-button @click="search" type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list">
      <el-table-column
        prop="id"
        label="序号"
        align="center"
        width="50px"
      ></el-table-column>
      <el-table-column
        prop="subjectName"
        label="学科名称"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="creator"
        label="创建者"
        width="80px"
      ></el-table-column>
      <el-table-column
        prop="addDate"
        label="创建日期"
        width="180px"
        align="center"
      >
        <!-- 作用域插槽 -->
        <template slot-scope="obj">
          {{ obj.row.addDate | parseTimeByString }}
        </template>
      </el-table-column>
      <el-table-column
        prop="isFrontDisplay"
        align="center"
        label="前台是否显示"
      >
        <template slot-scope="obj">
          {{ obj.row.isFrontDisplay === 1 ? "显示" : "隐藏" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="twoLevelDirectory"
        align="center"
        width="80px"
        label="二级目录"
      ></el-table-column>
      <el-table-column
        prop="tags"
        align="center"
        label="标签"
        width="50px"
      ></el-table-column>
      <el-table-column
        prop="totals"
        align="center"
        width="80px"
        label="题目数量"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="obj">
          <el-button type="text">学科分类</el-button>
          <el-button type="text">学科标签</el-button>
          <el-button type="text">修改</el-button>
          <el-button type="text" @click="delItem(obj.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row type="flex" justify="end" style="margin:30px 0">
      <el-pagination
        background
        layout="prev, pager, next, sizes, jumper"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
      ></el-pagination>
    </el-row>
    <el-dialog :show-close="false" :visible="dialogVisible">
      <!-- 主体内容 -->
      <el-form ref="myForm" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="学科名称" prop="subjectID">
          <el-input v-model="formData.subjectID" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="是否前台显示" prop="value">
          <el-switch
            v-model="formData.value"
            active-color="#13ce66"
            inactive-color="220, 223, 230"
            style="width:50%"
          ></el-switch>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="end">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button>取消</el-button>
      </el-row>
    </el-dialog>
  </el-card>
</template>

<script>
import {status} from '../../api/hmmm/constants'
import { list, remove ,add,updata } from "../../api/hmmm/subjects";
export default {
  name: "SubjectsList",
  data() {
    return {
      
      // 控制弹窗的显示和隐藏
      dialogVisible: false,
      // 搜索对象
      searchForm: {
        subjectName: "" //学科名称
      },
      list: [], //列表的数据
      page: {
        currentPage: 1, //当前页码
        pageSize: 10, //每页条数
        total: 0 //总数量
      },
      formData: {
        subjectID: null,
        // tagName:''
        value:false
      },
      rules: {
        subjectID:[{requir: true,message:'学科ID不能为空'}]
        
      }
    };
  },
  methods: {
    async submitForm() {
      await this.$refs.myForm.validate()
      await add(this.formData)
      this.$message({ type: "success", message: "操作成功" });
    },
    async delItem(id) {
      await this.$confirm("您是否确定删除此数据");
      // 确定删除
      await remove({ id });
      this.$message({ type: "success", message: "删除成功" });
      this.getSubject(this.searchForm); //应该带状态查询
    },
    search() {
      // 搜索方法
      this.page.currentPage = 1; //搜索回到第一页
      this.getSubject(this.searchForm);
    },
    // 将数据还原为初始状态
    clear() {
      this.searchForm = {
        subjectName: "" //学科名称
      };
    },
    // 获取科目数据
    // getSubject() {
    // 调用接口
    // SubjectsList({
    //   page:this.page.currentPage,
    //   pageSize:this.page.pageSize
    // }).then({
    //   this.list=result.data.items //列表数据
    // this.page.total=result.data.counts //总条数
    // })
    // },
    getSubject(data) {
      list({
        page: this.page.currentPage,
        pagesize: this.page.pageSize,
        ...data
      }).then(result => {
        this.list = result.data.items;
        this.page.total = result.data.counts;
      });
    }
  },
  created() {
    this.getSubject();
    // list({
    //   page:this.page.currentPage,
    //   pagesize:this.page.pageSize
    // }).then(result => {
    //   this.list=result.data.items
    //   this.page.total=result.data.counts
    // })
  }
};
</script>

<style scoped></style>
