<template>
  <el-dialog
    class="modal-md slider-modal"
    :visible.sync="value"
    append-to-body
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <div class="modal-header" slot="title">
      <span>提示</span>
      <i class="el-icon-close" @click="close"></i>
    </div>
    <div class="modal-body">
      <iframe class="url-iframe" :src="img_bak.go" frameborder="0"></iframe>
    </div>
    <div class="modal-footer hide" slot="footer"></div>
  </el-dialog>
</template>

<script>
import entry from './entry'
export default entry
</script>