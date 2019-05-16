<template>
  <div class="login-main">
    <finder-modal v-model="finder_modal" @close_finder_modal="close_finder_modal" />
    <div class="flur-box" ref="login_main"></div>
    <div class="login-body">
      <div class="login-logo"></div>
      <div class="login-con">
        <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="loginRule">
          <el-form-item prop="user">
            <el-input ref="login-input" class="item-input my-input" type="text" v-model="loginForm.user" @keyup.enter.native="sigin('loginForm')" required/>
            <label>用户名</label>
          </el-form-item>
          <el-form-item prop="password">
            <el-input ref="login-input" class="item-input" type="password" v-model="loginForm.password" @keyup.enter.native="sigin('loginForm')" required/>
            <label>密码</label>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sigin('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-footer">
        <span>还没有账号?</span>
        <em @click="register">马上注册</em>
        <br>
        <span>如果忘记密码,</span>
        <em @click="finder_pwd">找回密码</em>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import entry from './entry'
export default entry
</script>
