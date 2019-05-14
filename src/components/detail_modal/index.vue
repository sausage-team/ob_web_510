<template>
  <el-dialog
    class="modal-md detail-modal"
    :visible.sync="value"
    append-to-body
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <div class="modal-header" slot="title">
      <span>
        <img :src="imgUrl" alt="">
        <span>{{artData.author}}</span>
      </span>
      <i class="el-icon-close" @click="close"></i>
    </div>
    <div class="modal-body">
      <div class="art-title">
        {{artData.title}}
      </div>
      <div class="art-con">
        <div class="m-box" :style="{'background-image': `url(${artData.cover})`}"></div>
        <div class="m-con" v-html="artData.content"></div>
      </div>
    </div>
    <div class="modal-footer hide" slot="footer">
    </div>
  </el-dialog>
</template>

<script>
import entry from './entry'
export default entry
</script>
