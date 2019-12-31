<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <!-- 搜索 -->
        <el-form :model="requestParameters" ref="requestParameters">
          <div class="filter-container">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="标签名称：" prop="tags">
                  <el-input
                    @keyup.enter="handleFilter"
                    style="width: 180px;"
                    placeholder="请输入"
                    class="filter-item"
                    v-model="requestParameters.tags"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="省：" prop="province">
                  <el-select
                    class="filter-item"
                    style="width: 120px;"
                    v-model="requestParameters.province"
                    @keyup.enter="handleFilter"
                    @change="handleProvince"
                    filterable
                  >
                    <el-option
                      v-for="item in citySelect.province"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="市：" prop="city">
                  <el-select
                    class="filter-item"
                    style="width: 120px;"
                    v-model="requestParameters.city"
                    @keyup.enter="handleFilter"
                    filterable
                  >
                    <el-option
                      v-for="item in citySelect.cityDate"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="企业简称：" prop="shortName">
                  <el-input v-model="requestParameters.shortName" style="width: 180px;"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="状态：" prop="state">
                  <el-select
                    class="filter-item"
                    style="width: 100px;"
                    v-model="requestParameters.state"
                    @keyup.enter="handleFilter"
                  >
                    <el-option
                      v-for="item in status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="操作：">
                  <el-button
                    size="small"
                    type="primary"
                    icon="el-icon-search"
                    @click="handleFilter"
                  >搜索</el-button>
                  <!-- <el-button class="filter-item" size="small" type="primary" @click="resetForm">重置</el-button> -->
                </el-form-item>
              </el-col>
            </el-row>

            <el-button
              class="filter-item fr"
              size="small"
              style="margin-left: 10px;"
              @click="handleChange('add')"
              type="primary"
              icon="el-icon-edit"
            >新增用户</el-button>
          </div>
        </el-form>
        <!-- 数据记录 -->
        <el-alert
          v-if="alertText !== ''"
          :title="alertText"
          type="info"
          class="alert"
          :closable="false"
          show-icon
        ></el-alert>
        <!-- end -->
        <!-- 数据列表 -->
        <el-table
          :key="tableKey"
          :data="dataList"
          v-loading="listLoading"
          element-loading-text="给我一点时间"
          fit
          highlight-current-row
          style="width: 100%"
          border
        >
          <el-table-column align="center" label="序号">
            <template slot-scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="企业编号">
            <template slot-scope="scope">
              <span>{{scope.row.number}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="企业简称">
            <template slot-scope="scope">
              <span>{{scope.row.shortName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="标签">
            <template slot-scope="scope">
              <span>{{scope.row.tags}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建者">
            <template slot-scope="scope">
              <span>{{scope.row.creatorID}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建日期">
            <template slot-scope="scope">
              <span>{{scope.row.addDate}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="备注">
            <template slot-scope="scope">
              <span>{{scope.row.remarks}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.state==1">启用</span>
              <span v-else>禁用</span>
            </template>
          </el-table-column>
          <!-- 操作按钮 -->
          <el-table-column
            align="center"
            label="操作"
            width="280"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleChange(scope.row.id)">编辑</el-button>
              <el-button type="primary" size="mini" @click="handleStatus(scope.row)">
                <span v-if="scope.row.state==0">启用</span>
                <span v-else>禁用</span>
              </el-button>
              <el-button
                v-if="scope.row.status!='deleted'"
                size="mini"
                type="danger"
                @click="removeUser(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- end -->
        <!-- 分页 -->
        <div class="pagination">
          <div class="pages">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="Number(requestParameters.page)"
              :total="Number(total)"
              :page-size="Number(requestParameters.pagesize)"
              :page-sizes="[10,20,30, 50]"
              layout="sizes, prev, pager, next, jumper"
            ></el-pagination>
          </div>
        </div>
        <!-- end -->
        <!-- 新增标签弹层 -->
        <Dialog ref="editUser" :titleInfo="titleInfo" :formBase="formData" v-on:newDataes="getList"></Dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import { status } from '@/api/hmmm/constants'
import { list, remove, detail, disabled } from '@/api/hmmm/companys'
import { provinces, citys } from '@/api/hmmm/citys.js'
import Dialog from './../components/companys-add'
var _this = null
export default {
  name: 'CompanysList',
  components: {
    Dialog
  },
  data() {
    return {
      tableKey: 0,
      dataList: [],
      total: null,
      listLoading: true,
      alertText: '',
      requestParameters: {
        page: 1,
        pagesize: 10
      },
      titleInfo: {
        pageTitle: '用户', // 页面标题
        text: '' // 新增、编辑文本
      },
      formData: {
        isFamous: '',
        shortName: '',
        company: '',
        province: '',
        city: '',
        tags: '',
        remarks: ''
      },
      citySelect: {
        province: [],
        cityDate: []
      }
    }
  },
  computed: {
    status() {
      return status
    }
  },
  methods: {
    // 初始数据
    initialDate() {
      // 读取数据
      this.getList()
    },
    // 获取列表数据
    async getList(params) {
      this.listLoading = true
      const { data: res } = await list(this.requestParameters)
      // 获取数据给dataList
      this.dataList = res.items
      // 获取总条数
      this.total = res.counts
      this.alertText = `共 ${this.total} 条记录`
      this.listLoading = false
    },
    // 重置
    resetForm() {
      this.$refs['requestParameters'].resetFields()
    },
    // 搜索信息
    handleFilter() {
      this.requestParameters.page = 1
      this.getList(this.requestParameters)
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.requestParameters.pagesize = val
      if (this.requestParameters.page === 1) {
        this.getList(this.requestParameters)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.requestParameters.page = val
      this.getList()
    },

    // **********************************
    // 搜索的项目
    // 添加、编辑之后表单清空
    query() {
      this.formData = {}
    },
    // 新增用户、编辑用户
    handleChange(id) {
      this.query()
      this.$refs.editUser.dialogFormV()
      if (id === 'add') {
        this.titleInfo.text = '创建' // 给弹层传参
      } else {
        this.titleInfo.text = '编辑' // 给弹层传参
        this.hanldeEditForm(id)
      }
    },
    // 窗口操作**********************************
    // 编辑
    // 表单详情数据加载
    async hanldeEditForm(objeditId) {
      this.formData.id = objeditId
      const { data: res } = await detail({ id: objeditId })
      // 获取详情 给formData
      this.formData = res
    },
    // 删除
    removeUser(user) {
      this.$confirm('此操作将永久删除用户 ' + ', 是否继续?', '提示', {
        type: 'warning'
      })
        .then(async () => {
          await remove({ id: user })
            .then(response => {
              this.$message.success('成功删除了用户' + '!')
              this.dataList.splice(user, 1)
              this.getList(this.requestParameters)
            })
            .catch(response => {
              this.$message.error('删除失败!')
            })
        })
        .catch(() => {
          this.$message.info('已取消操作!')
        })
    },
    // 启用、禁用
    handleStatus(val) {
      var status = ''
      if (val.state === true) {
        val.state = 0
        status = '禁用'
      } else {
        val.state = 1
        status = '启用'
      }
      var data = {
        id: val.id,
        state: val.state
      }
      this.$confirm('已成功' + status + ', 是否继续?', '提示', {
        type: 'warning'
      })
        .then(async () => {
          await disabled(data)
            .then(response => {
              this.$message.success('已成功' + status + '!')
              this.getList(this.requestParameters)
            })
            .catch(response => {
              this.$message.error(status + '失败!')
            })
        })
        .catch(() => {
          this.$message.info('已取消操作!')
        })
    },
    // 获取省
    getCityData: function() {
      this.citySelect.province = provinces()
    },
    // 选省获取到市
    handleProvince: function(e) {
      this.citySelect.cityDate = citys(e)
      this.requestParameters.city = this.citySelect.cityDate[0]
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created() {
    var _this = this
    this.initialDate()
    this.getCityData()
    // 键盘enter操作
    document.onkeydown = function(e) {
      var key = window.event.keyCode
      if (key === 13) {
        _this.handleFilter(this.requestParameters)
      }
    }
  },
  // 组件更新
  updated: function() {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 10px;
}
</style>

<style>
.el-table th {
  background-color: #fafafa;
}
.el-table th.is-leaf {
  border-bottom: 2px solid #e8e8e8;
}
.disabled td {
  background-color: #f9f9f9;
  color: #c1c1c1;
}
.disabled .el-button--primary,
.disabled .el-button--danger {
  background-color: #dbdada;
  border: 1px solid #dbdada;
  color: #999;
  cursor: not-allowed;
}
</style>
