<template>
  <el-dialog
    class="modal-sm finder-modal"
    :visible.sync="value"
    append-to-body
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <div class="modal-header" slot="title">
      <span>找回密码</span>
      <i class="el-icon-close" @click="close"></i>
    </div>
    <div class="modal-body">
      <el-form class="register-form" ref="finderForm" :model="finderForm" :rules="finderRule">
        <el-form-item prop="user">
          <el-input ref="finder-input" class="item-input my-input" type="text" v-model="finderForm.user" @keyup.enter.native="finder('finderForm')" required/>
          <label>用户名</label>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input ref="finder-input" class="item-input" type="text" v-model="finderForm.phone" @keyup.enter.native="finder('finderForm')" required/>
          <label>手机号</label>
        </el-form-item>
        <el-form-item prop="password">
          <el-input ref="finder-input" class="item-input" type="password" v-model="finderForm.password" @keyup.enter.native="finder('finderForm')" required/>
          <label>新密码</label>
        </el-form-item>
        <el-form-item prop="confirm">
          <el-input ref="finder-input" class="item-input" type="password" v-model="finderForm.confirm" @keyup.enter.native="finder('finderForm')" required/>
          <label>再次输入密码</label>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="finder('finderForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="modal-footer hide">
    </div>
  </el-dialog>
</template>

<script>
import entry from './entry'
export default entry
</script>