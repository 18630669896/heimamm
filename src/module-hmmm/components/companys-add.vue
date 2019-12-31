<template>
  <div class="add-form">
    <el-dialog :title="titleInfo.text+titleInfo.pageTitle" :visible.sync="dialogFormVisible">
      <el-form
        :rules="ruleInline"
        ref="dataForm"
        :model="formBase"
        label-position="left"
        label-width="150px"
        style="width: 80%; margin-left:10px;"
      >
        <el-form-item label="企业名称" prop="shortName">
          <el-input v-model="formBase.shortName"></el-input>
          <el-checkbox v-model="formBase.isFamous">是否为名企</el-checkbox>
        </el-form-item>
        <el-form-item label="所属公司" prop="company">
          <el-input v-model="formBase.company"></el-input>
          <p>https://www.tianyancha.com （在此可查询所属公司全称及简称）</p>
        </el-form-item>
        <el-form-item label="城市" prop="province">
          <el-select
            class="filter-item"
            style="width: 130px;"
            v-model="formBase.province"
            @keyup.enter="handleFilter"
            @change="handleProvince"
            filterable
          >
            <el-option v-for="item in citySelect.province" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-select
            class="filter-item"
            style="width: 130px;"
            v-model="formBase.city"
            @keyup.enter="handleFilter"
            filterable
          >
            <el-option v-for="item in citySelect.cityDate" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方向（企业标签）" prop="tags">
          <el-input v-model="formBase.tags"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入"
            v-model="formBase.remarks"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormH">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { update, add } from '@/api/base/users'
import { provinces, citys } from '@/api/hmmm/citys.js'
export default {
  name: 'CompanysAdd',
  props: {
    titleInfo: {
      type: Object,
      required: true
    },
    formBase: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      citySelect: {
        province: [],
        cityDate: []
      },
      // 表单验证
      ruleInline: {
        shortName: [
          { required: true, message: '企业简称不能为空', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请选择省份', trigger: 'change' }
        ],
        tags: [{ required: true, message: '请请输标签', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  methods: {
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false
    },
    // 获取省
    getCityData: function() {
      this.citySelect.province = provinces()
    },
    // 选省获取到市
    handleProvince: function(e) {
      this.citySelect.cityDate = citys(e)
      this.formBase.city = this.citySelect.cityDate[0]
    },
    // 表单提交
    createData() {
      this.$refs['dataForm'].validate(async valid => {
        if (valid) {
          this.dialogFormH()
          let data = {
            ...this.formBase
          }
          if (this.formBase.id) {
            await update(data).then(() => {
              this.$emit('newDataes', this.formBase)
            })
          } else {
            await add(this.formBase).then(() => {
              this.$emit('newDataes', this.formBase)
            })
          }
        } else {
          this.$message.error('*号为必填项!')
        }
      })
    }
  },
  // 挂载结束

  mounted: function() {},
  // 创建完毕状态
  created() {
    this.getCityData()
  },
  // 组件更新
  updated: function() {}
}
</script>
<style>
.el-form--label-left .el-form-item__label {
  text-align: right;
}
.el-form-item--medium {
  margin-bottom: 22px;
}
.el-dialog__footer {
  text-align: center;
}
</style>
