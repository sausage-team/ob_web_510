<template>
  <div class="header-main">
    <div class="logo-main">
      <div class="logo"></div>
    </div>
    <div class="menu-main">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">目的地</el-menu-item>
        <el-menu-item index="3">旅游攻略</el-menu-item>
        <el-menu-item index="4">机票</el-menu-item>
        <el-menu-item index="5">订酒店</el-menu-item>
      </el-menu>
    </div>
    <div class="user-main">
      <el-button type="text">登录</el-button>
      <div class="spe-bor"></div>
      <el-button type="text">注册</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import entry from './entry'
export default entry
</script>
