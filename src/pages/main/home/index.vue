<template>
  <div class="home-main">
    <div class="slider-main">
      <detail-modal v-model="modals.detail_modal" @close_detail_modal="close_detail_modal" :art-id="art_id" />
      <tip-modal v-model="modals.tip_modal" @close_tip_modal="close_tip_modal"></tip-modal>
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
          <el-input v-model="searchText" @keyup.enter.native="searchList()" placeholder="搜目的地/攻略/酒店/旅行特价"></el-input>
          <el-button icon="el-icon-search" type="primary" @click="searchList()"></el-button>
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
    <div class="con-body">
      <div class="con-left">
        <div class="tip" @click="open_tip_modal">
          <img src="http://images.mafengwo.net/images/safety-prevention/index-link.png" alt="">
        </div>
        <div class="left-slider-main" v-if="fav_list && fav_list.length > 0">
          <div class="slider-menu">
            <ul>
              <li v-for="(item, index) in fav_list" :key="index" @click="chooseSlider($event, index)" :class="{'active': menu_count % fav_list.length === index}"></li>
            </ul>
          </div>
          <div class="slider-title">
            <span>旅行家专栏</span>
          </div>
          <div class="slider-box" ref="slider_menu">
            <ul>
              <li v-for="(item, index) in fav_list" :key="index">
                <div class="img-box">
                  <img :src="item.cover" alt="">
                </div>
                <div class="title" @click="toDetail($event, item)">
                  {{item.title}}
                </div>
                <div class="con">
                  {{item.preview}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="con-right">
        <div class="con-title">
          <div class="title-box">
            <span>热门游记</span>
            <el-dropdown class="prefer-filter">
              <span class="el-dropdown-link">
                {{prefer_text}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in prefer_list"
                  :key="index"
                  @click.native="choose_prefer_filter($event, item.name, item.value)">
                    {{item.name}}
                  </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
              <span class="el-dropdown-link">
                {{order_text}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in order_list"
                  :key="index"
                  @click.native="choose_order_filter($event, item.name, item.value)">
                    {{item.name}}
                  </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-button type="primary" @click="write_art($event)" icon="el-icon-edit">写游记</el-button>
        </div>
        <div class="con-body">
          <ul>
            <li v-for="(item, index) in art_list" :key="index" @click="toDetail($event, item)">
              <div class="left-img">
                <img :src="item.cover" alt="">
              </div>
              <div class="right-con">
                <div class="right-header">
                  {{item.title}}
                </div>
                <div class="right-body">
                  <span>{{item.preview}}</span>
                </div>
                <div class="right-footer">
                  <span>
                    <el-tag size="mini">{{prefer_list[item.category].name}}</el-tag>
                    by
                    <img :src="icon" alt=""></im>
                    <em>{{item.author || '未知'}}</em>
                    <i class="ivu-icon ivu-icon-md-eye"></i>
                    <em>{{item.frequency || ''}}</em>
                  </span>
                  <span>
                    <i class="ivu-icon ivu-icon-ios-heart"
                      @click="fav_article($event, item)"
                      v-show="item.is_collected"></i>
                    <i class="ivu-icon ivu-icon-ios-heart-outline"
                      @click="fav_article($event, item)"
                      v-show="!item.is_collected"></i>
                    <i class="ivu-icon ivu-icon-md-thumbs-up" 
                      @click="thumb_article($event, item)"
                      :class="{
                        'is-thumb': item.is_thumb
                      }"></i>
                    <em>{{item.thumb || ''}}</em>
                    {{utils.momentDate(item.created_time, 'date_time')}}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="con-footer" v-show="">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import entry from './entry'
export default entry
</script>