<template>
  <div class="login-container">
    <div class="loginBox">
      <el-form
      class="login-form"
      autocomplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
    >
      <div class="title-container">
        <!-- <h3 class="title">{{$t('login.title')}}</h3> -->
        <div class="logoInfo clearfix">
          <em class="logo"></em> 
          <span class="logoFontZ">黑马面面</span> 
          <span>用户登录</span>
        </div>
        <lang-select class="set-language"></lang-select>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          autocomplete="on"
          placeholder="username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          name="password"
          :type="passwordType"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.password"
          autocomplete="on"
          placeholder="password"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width:100%;margin-bottom:30px;"
        :loading="loading"
        @click.native.prevent="handleLogin"
      >{{$t('login.logIn')}}</el-button>

      <div class="tips">
        <span>{{$t('login.username')}} : root@admin.com</span>
        <span>{{$t('login.password')}} : 123456</span>
      </div>
      <div class="tips">
        <span style="margin-right:18px;">{{$t('login.username')}} : editor@admin.com</span>
        <span>{{$t('login.password')}} : 123456</span>
      </div>

    </el-form>
    </div>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import loginSocialSignin from './../components/loginSocialSignin'
import shajs from 'sha.js'

export default {
  components: { LangSelect, loginSocialSignin },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error('Please enter the email user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'root@admin.com',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          await this.$store
            .dispatch('LoginByUsername', {
              username: this.loginForm.username,
              password: shajs('sha256')
                .update(this.loginForm.password)
                .digest('hex')
            })
            .then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  },
  created() {
  },
  destroyed() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #333;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #DCDFE6;
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }
  .el-button--medium{
    height: 50px;
    line-height: 20px;
    font-size: 22px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #333;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  background: url('./../assets/bg.jpg');
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .loginBox{
     height: 100%;
     width: 100%;
    background: url('./../assets/logingBg.png') no-repeat 100% 100%;
    position: relative;
  }
  .login-form {
    position: absolute;
    left: 20%;
    top: 50%;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: -200px 0 0 0;
    background:#f5f5f5;
  }
  .tips {
    font-size: 14px;
    // color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      // font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      // color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
.logoInfo{
  padding-bottom:15px;
}
.logoInfo span{
	font-size: 22px;
	padding: 0 10px;
	float: left;
}
.logoInfo .logo{
	background: url(../assets/loginLogo.png) no-repeat;
	display:inline-block;
	width: 35px;
	height: 26px;
	float: left;
}
</style>
