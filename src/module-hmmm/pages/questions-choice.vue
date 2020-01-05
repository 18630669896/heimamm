<template>
  <div class="dashboard-container">
    <!-- <div class="app-container">题库精选</div> -->
    <el-button style="margin:10px " type="primary"  @click="add">+新增试题</el-button>
    <!-- 第一个卡片 -->

    <el-card>
      <el-form class="form" style="display:flex;flex-wrap:wrap;">
        <el-form-item class="one">
          <span>企业简称</span>
          <el-input style="width:200px" v-model="intro"></el-input>
        </el-form-item>
        <el-form-item class="one">
          难度
          <el-select v-model="difficulty.value">
            <el-option
              v-for="item in difficulty"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="one">
          状态
          <el-select v-model="publishType.value">
            <el-option
              v-for="item in publishType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="one">
          试题类型
          <el-select v-model="questionType.value">
            <el-option
              v-for="item in questionType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>标签 -->
        <!-- <el-select v-model="options"> -->
        <!-- <el-option></el-option> -->
        <!-- </el-select> -->
        <!-- </el-form-item> -->
        <el-form-item class="one">
          关键字
          <el-input style="width:200px" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item class="one">
          题目备注
          <el-input style="width:200px" v-model="remarks"></el-input>
        </el-form-item>
        <!-- <el-form-item>录入人
      <el-select v-model="questionType.value">
        <el-option v-for="item in questionType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
        </el-form-item>-->
        <el-form-item>
          二级目录
          <el-select v-model="name">
            <el-option v-for="item in name" :key="item" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>城市
      <el-select v-model="datas.value">
        <el-option v-for="item in datas" :key="item" :label="item.city" :value="item.city"></el-option>
      </el-select>
        </el-form-item>-->
        <!-- <el-form-item>区域
      <el-select v-model="questionType.value">
        <el-option v-for="item in questionType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
        </el-form-item>-->
        <el-form-item>
          方向
          <el-select v-model="direction.value">
            <el-option v-for="item in direction" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 第二个卡片 -->
    <el-card style="margin-top:40px;">
      <el-table :data="list" style="width: 100%" align="center">
        <el-table-column prop="id" label="序号" width="80px" align="center"></el-table-column>
        <el-table-column prop="number" label="试题编号" width="180" align="center"></el-table-column>
        <el-table-column prop="subjectName" label="题型" width="80px" align="center"></el-table-column>
        <el-table-column prop="stem" label="题干" width="80px" align="center"></el-table-column>
        <el-table-column prop="addDate" label="录入时间" align="center"></el-table-column>
        <el-table-column prop="city" label="难度" align="center"></el-table-column>
        <el-table-column prop="numberOfUse " label="使用次数" width="80px" align="center"></el-table-column>
        <el-table-column prop="creator" label="录入人" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center"></el-table-column>
        <el-table-column prop="operation" label="操作" align="center">
          <!-- 操作 -->
          <template slot-scope="obj">
            <el-button type="text">审核</el-button>
            <el-button type="text">预览</el-button>
            <el-button type="text" @click="putaway(obj.row.id)">上架</el-button>
            <el-button type="text">修改</el-button>
            <el-button type="text" @click="del(obj.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row type="flex" justify="end" style="margin:30px 0">
        <span style="margin:8px ">共{{ page.total }}页</span>
        <el-pagination
          @currrent-change="change"
          background
          layout="prev, pager, next"
          :current-page="page.currentPage"
          :total="page.total"
          :page-size="page.pageSize"
        ></el-pagination>
      </el-row>
    </el-card>
  </div>
</template>
  

<script>
import { choice } from "../../api/hmmm/questions"; // 列表
import { choicePublish } from "../../api/hmmm/questions"; // 上下架
import { difficulty } from "../../api/hmmm/constants"; //难度
import { questionType } from "../../api/hmmm/constants"; // 题型
import { direction } from "../../api/hmmm/constants"; // 方向
import { publishType } from "../../api/hmmm/constants"; // 状态
import { remove } from "../../api/hmmm/questions"; // 删除
import { datas } from "../../api/hmmm/citys"; // 区域
import { router } from "../router/index"; // 区域

export default {
  data() {
    return {
      name:[{ value: '1',
          label: '1'}],
      difficulty: [], //难度
      questionType: [], //题型
      direction: [], // 方向
      publishType: [], //状态
      list: [], // 列表数据
      intro: "", // 企业简称
      keyword: "", // 关键字
      remarks: "", // 题目备注
      datas: [], // 区域
      // 分页
      page: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
    };
  },
  methods: {
    // 新增试题
    add(){
    
    },
    // 上架
    putaway(id) {
      this.$confirm("您确定要上架吗")
        .then(res => {
          choicePublish({ id }).then(res => {
            this.$message({
              type: "info",
              message: "上架成功"
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 删除
    del(id) {
      this.$confirm("您是否确定删除此数据?")
        .then(res => {
          remove({ id });
          this.$message({
            type: "info",
            message: "删除成功"
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 切换分页
    change(newpage) {
      this.page.currentPage = newpage;
      choice();
    }
  },
  created() {
    // 下拉选项
    this.difficulty = difficulty; //难度
    this.questionType = questionType; // 题型
    this.direction = direction; // 方向
    this.publishType = publishType; //状态
    this.datas = datas;
    // 请求数据
    choice().then(res => {
      this.list = res.data.items;
    });
  }
};
</script>

<style scoped lang="scss">
.one {
  width: 25%;
}
.two {
  flex: end;
}

// 1. 如果在此处 scoped 当前组件下生效样式
// 2. 在style中的所有选择器 编译的时候会自动带上属性选择器
// 3. .box{} ===> .box[data-v-2c9827a4]{} 交集选择器
// 4. 在当前组件下暴露的标签都会加上 data-v-2c9827a4 属性
// 5. 但是如果是组件，其他组件内部的标签是不会加上这个属性 意味写组件内部的样式是不会生效的
// 6. 其他组件的样式都不会生效
</style>
