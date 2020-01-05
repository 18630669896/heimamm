<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-form>
          <el-form-item>
            <el-radio-group @change="changeType" v-model="fromData.radio">
              <el-radio :label="1">单选</el-radio>
              <el-radio :label="2">多选</el-radio>
              <el-radio :label="3">简答</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 单选 -->
          <el-form-item v-if="fromData.radio===1">
            <el-radio-group v-model="selectOptions" @change="change">
              <el-radio
                v-for="item in fromData.options"
                :key="item.code"
                :label="item.code"
              >{{item.code}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 多选 -->
          <el-form-item v-else-if="fromData.radio===2">
            <el-checkbox
              v-model="item.isRight"
              v-for="item in fromData.options"
              :key="item.code"
              :label="item.code"
            ></el-checkbox>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item v-if="fromData.radio !== 3">
            <el-button type="primary" @click="add">添加选项</el-button>
          </el-form-item>
          {{ fromData.options }}
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  // name: "QuestionsNew",
  data() {
    return {
      fromData: {
        radio: 1,
        options: []
      },
      selectOptions: "",
      str: "abcdefghijklmnopqrstuvxyz"
    };
  },
  methods: {
    changeType(){
       this.fromData.options = this.fromData.options.map(item=>{
         item.isRight=false
         return item
       })
    },
    change() {
      // this.fromData.options.code==this.selectOptions?this.options.isRight=true:false
      this.fromData.options = this.fromData.options.map(item => {
        item.code === this.selectOptions
          ? (item.isRight = true)
          : (item.isRight = false);
        return item;
      });
    },
    // 添加
    add() {
      this.fromData.options.push({
        code: this.nex,
        isRight: false
      });
    }
  },
  computed: {
    nex() {
      return this.str.charAt(this.fromData.options.length).toUpperCase();
    }
  }
};
</script>

<style scoped>
</style>
