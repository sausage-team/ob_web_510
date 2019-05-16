<template>
  <el-dialog
    class="modal-sm person-modal"
    :visible.sync="value"
    append-to-body
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <div class="modal-header" slot="title">
      <span>个人中心</span>
      <i class="el-icon-close" @click="close"></i>
    </div>
    <div class="modal-body">
      <ul>
        <li>
          <div class="item-box">
            <label>用户名</label>
            <div class="item-con">
              <span>{{userData.username}}</span>
            </div>
          </div>
        </li>
        <li>
          <div class="item-box">
            <label>喜好</label>
            <div class="item-con">
              <span v-show="!showPrefer">{{prefer_list[userData.prefer].name}}</span>
              <i v-show="!showPrefer" class="ivu-icon ivu-icon-ios-create-outline" @click="showPrefer = true"></i>
              <el-select v-show="showPrefer" v-model="userData.prefer">
                <el-option
                  v-for="(item, index) in prefer_list"
                  :key="index"
                  :label="item.name"
                  :value="item.value"/>
              </el-select>
              <el-button v-show="showPrefer" type="success" icon="el-icon-check" @click="saveUserData('prefer')" circle></el-button>
              <el-button v-show="showPrefer" type="danger" icon="el-icon-close" @click="cancelPrefer" circle></el-button>
            </div>
          </div>
        </li>
        <li>
          <div class="item-box">
            <label>居住地</label>
            <div class="item-con">
              <span v-show="!showPlace">{{userData.place}}</span>
              <i v-show="!showPlace" class="ivu-icon ivu-icon-ios-create-outline"  @click="showPlace = true"></i>
              <el-input v-show="showPlace" v-model="userData.place"></el-input>
              <el-button v-show="showPlace" type="success" icon="el-icon-check" @click="saveUserData('place')" circle></el-button>
              <el-button v-show="showPlace" type="danger" icon="el-icon-close" @click="cancelPlace" circle></el-button>
            </div>
          </div>
        </li>
        <li>
          <el-button type="primary" @click="reset_new_password">重置密码</el-button>
          <span class="tip" v-show="show_new_password">
            请尽快保存新密码
            <em>{{new_password}}</em>
          </span>
        </li>
      </ul>
    </div>
    <div class="modal-footer hide" slot="footer"></div>
  </el-dialog>
</template>

<script>
import entry from './entry'
export default entry
</script>