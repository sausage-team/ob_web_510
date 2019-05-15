<template>
  <div class="register-main">
    <div class="flur-box" ref="register_main"></div>
    <div class="register-body">
      <div class="register-logo"></div>
      <div class="register-con">
        <el-form class="register-form" ref="registerForm" :model="registerForm" :rules="registerRule">
          <el-form-item prop="user">
            <el-input ref="register-input" class="item-input my-input" type="text" v-model="registerForm.user" @keyup.enter.native="sigin('registerForm')" required/>
            <label>用户名</label>
          </el-form-item>
          <el-form-item prop="password">
            <el-input ref="register-input" class="item-input" type="password" v-model="registerForm.password" @keyup.enter.native="sigin('registerForm')" required/>
            <label>密码</label>
          </el-form-item>
          <el-form-item prop="confirm">
            <el-input ref="register-input" class="item-input" type="password" v-model="registerForm.confirm" @keyup.enter.native="sigin('registerForm')" required/>
            <label>再次输入密码</label>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input ref="register-input" class="item-input" type="text" v-model="registerForm.phone" @keyup.enter.native="sigin('registerForm')" required/>
            <label>手机号</label>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="register-footer">
        <span>已经注册？</span>
        <em @click="sign">马上登录</em>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import entry from './entry'
export default entry
</script>