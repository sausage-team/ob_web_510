<template>
  <div class="home-main">
    <div class="slider-main">
      <div class="slider-image">
        <img :src="img" alt="">
      </div>
      <div class="slider-con">
        <div class="title-Date">
          <span>
            <em>10</em>/May.2019
          </span>
        </div>
        <div class="title-con">
          <span>南美四重奏，一首美丽新世界的狂想曲</span>
        </div>
        <div class="search-box">
          <el-input v-model="searchText" placeholder="搜目的地/攻略/酒店/旅行特价"></el-input>
          <el-button icon="el-icon-search" type="primary"></el-button>
        </div>
        <div class="menu-list">
          <ul>
            <li v-for="(item, index) in img_list"
              :class="{'active': count % 5 === index}"
              @click="chooseImg($event, index)">
              <img :src="item" alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="menu-main">
      <ul>
        <li v-for="(item, index) in menu_list" :key="index">
          <div class="menu-item">
            <span>{{item.name}}</span>
            <span>{{item.text}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="con-body">
      <div class="con-left">
        <div class="tip">
          <img src="http://images.mafengwo.net/images/safety-prevention/index-link.png" alt="">
        </div>
        <div class="left-slider-main">
          <div class="slider-menu">
            <ul>
              <li v-for="(item, index) in slider_list" :key="index" @click="chooseSlider($event, index)" :class="{'active': menu_count % 5 === index}"></li>
            </ul>
          </div>
          <div class="slider-title">
            <span>旅行家专栏</span>
            <span>专栏首页</span>
          </div>
          <div class="slider-box" ref="slider_menu">
            <ul>
              <li v-for="(item, index) in slider_list" :key="index">
                <div class="img-box">
                  <img :src="item.img" alt="">
                </div>
                <div class="title">
                  {{item.title}}
                </div>
                <div class="con">
                  {{item.con}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="con-right"></div>
    </div>
  </div>
</template>

<script>
import entry from './entry'
export default entry
</script>