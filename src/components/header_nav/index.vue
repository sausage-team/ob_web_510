<template>
  <div :class="{
    'header-main': true,
    'not-home': $route.name !== 'home'
  }">
    <div class="logo-main">
      <div class="logo" @click="viewGo($event, 'home')"></div>
    </div>
    <div class="menu-main">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click.native="viewGo($event, 'home')">首页</el-menu-item>
        <el-menu-item index="2" v-show="userData && userData.role === 1" @click.native="viewGo($event, 'examine')">游记审核</el-menu-item>
        <el-menu-item index="3" @click.native="viewGo($event, 'person')">个人中心</el-menu-item>
      </el-menu>
    </div>
    <div class="user-main" v-show="!userData || !userData.username">
      <el-button type="text" @click="sign($event)">登录</el-button>
      <div class="spe-bor"></div>
      <el-button type="text" @click="register($event)">注册</el-button>
    </div>
    <div class="user-main has" v-show="userData && userData.username">
      <div class="icon-box">
        <img :src="icon" alt="">
      </div>
      <div class="user-box">
        <span>{{userData.username}}</span>
      </div>
      <div class="logout">
        <i class="el-icon-switch-button" @click="logout($event)"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import entry from './entry'
export default entry
</script>
