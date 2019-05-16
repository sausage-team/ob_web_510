<template>
  <div class="tn-main">
    <div class="tn-con">
      <div class="tn-header">
        <span>发表新话题/文章</span>
      </div>
      <div class="tn-body">
        <el-upload
          class="upload"
          :class="{
            'has-img': imgUrl
          }"
          :before-upload="filecheck"
          action="/api/article/cover"
          list-type="picture-card"
          :on-success="handlesuccess"
          :on-preview="handlePictureCardPreview"
          name="upload"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
          <span>请上传封面图片</span>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div class="input-box">
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
          <el-input placeholder="请输入标题" v-model="title" :maxlength="50" clearable></el-input>
        </div>
        <div class="ckeditor">
          <textarea id="editor" :value="value" data-sample-short></textarea>
        </div>
      </div>
      <div class="tn-footer">
        <el-button type="primary" @click="ok">发表</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import entry from './entry'
export default entry
</script>