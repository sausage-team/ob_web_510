<template>
  <div class="home-main">
    <div class="slider-main">
      <detail-modal v-model="detail_modal" @close_detail_modal="close_detail_modal" :art-id="art_id" />
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
        <div class="slider-item">
          <div class="slider-title">
            <span>旅游攻略推荐</span>
            <span>更多</span>
          </div>
          <div class="item-con">
            <img src="https://b2-q.mafengwo.net/s13/M00/DD/42/wKgEaVySTtyAZIgNAAK7Sc9uhPw62.jpeg?imageMogr2%2Fthumbnail%2F%21260x139r%2Fgravity%2FCenter%2Fcrop%2F%21260x139%2Fquality%2F100" alt="">
            <span>九寨沟攻略 | 阿坝藏族羌族自治州九寨沟景区攻略...</span>
          </div>
        </div>
        <div class="left-slider-main item1">
          <div class="slider-menu">
            <ul>
              <li v-for="(item, index) in slider_list1" :key="index" @click="chooseSlider1($event, index)" :class="{'active': menu_count1 % 4 === index}"></li>
            </ul>
          </div>
          <div class="slider-title">
            <span>最新活动</span>
            <span>查看全部&gt;</span>
          </div>
          <div class="slider-box" ref="slider_menu1">
            <ul>
              <li v-for="(item, index) in slider_list1" :key="index">
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
        <div class="slider-item">
          <div class="slider-title">
            <span>未知旅行实验室</span>
            <span>查看更多</span>
          </div>
          <div class="item-con">
            <img src="https://images.mafengwo.net/images/new-index/unknownTravel181120.png" alt="">
          </div>
        </div>
        <div class="slider-item">
          <div class="slider-title">
            <span>加入马蜂窝</span>
            <span>了解详情</span>
          </div>
          <div class="item-con">
            <img src="https://p1-q.mafengwo.net/s13/M00/FB/6B/wKgEaVx03pWACwV_AAB9EDqNfwg64.jpeg" alt="">
          </div>
        </div>
        <div class="slider-item">
          <div class="slider-title">
            <span>马蜂窝最新资讯</span>
          </div>
          <div class="item-con">
            <ul>
              <li>
                <div class="date">
                  04月23日
                </div>
                <div class="con">
                  马蜂窝旅游网服务监督员召集令发布
                </div>
              </li>
              <li>
                <div class="date">
                  04月23日
                </div>
                <div class="con">
                  关于部分用户游记无法显示的说明
                </div>
              </li>
              <li>
                <div class="date">
                  02月06日
                </div>
                <div class="con">
                  正式更名为“马蜂窝旅游”
                </div>
              </li>
              <li>
                <div class="date">
                  11月08日
                </div>
                <div class="con">
                  蚂蜂窝2018蜂首台历开始预售
                </div>
              </li>
              <li>
                <div class="date">
                  11月05日
                </div>
                <div class="con">
                  蚂蜂窝赤水音乐季圆满结束
                </div>
              </li>
              <li>
                <div class="date">
                  05月12日
                </div>
                <div class="con">
                  指路人俱乐部首期面基大会圆满成功
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="con-right">
        <div class="con-title">
          <span>热门游记</span>
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
                    by
                    <img :src="icon" alt=""></im>
                    <em>{{item.author || '未知'}}</em>
                  </span>
                  <span>
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