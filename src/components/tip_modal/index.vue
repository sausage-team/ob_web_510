<template>
  <el-dialog
    class="modal-md tip-modal"
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
      <div class="con-title">
        <img src="http://images.mafengwo.net/images/safety-prevention/title.png" title="出境游知识安全提示">
      </div>
      <div class="con-tip-list">
        <ul>
          <li class="tip-li">
            <a href="https://ztc.cs.mfa.gov.cn/web/yujing.html?type=1" target="_blank" class="tip-href">
              <img src="http://images.mafengwo.net/images/safety-prevention/link-btn4.png" alt="暂勿前往">
            </a>
          </li>
          <li class="tip-li">
            <a href="https://ztc.cs.mfa.gov.cn/web/yujing.html?type=2" target="_blank" class="tip-href">
              <img src="http://images.mafengwo.net/images/safety-prevention/link-btn5.png" alt="">
            </a>
          </li>
          <li class="tip-li">
            <a href="https://ztc.cs.mfa.gov.cn/web/yujing.html?type=3" target="_blank" class="tip-href">
              <img src="http://images.mafengwo.net/images/safety-prevention/link-btn3.png" alt="">
            </a>
          </li>
          <li class="tip-li">
            <a href="https://ztc.cs.mfa.gov.cn/web/list-theme.html?title=%E9%A2%86%E4%BE%A8%E6%92%AD%E6%8A%A5" target="_blank" class="tip-href">
              <img src="http://images.mafengwo.net/images/safety-prevention/link-btn2.png" alt="">
            </a>
          </li>
          <li class="tip-li">
            <a href="https://www.mct.gov.cn/ggfw/cxts/" target="_blank" class="tip-href">
              <img src="http://images.mafengwo.net/images/safety-prevention/link-btn1.png" alt="">
            </a>
          </li>
        </ul>
      </div>
      <div class="con-tip-con">
        <p>
          特别提醒广大游客文明安全出行，随时关注新闻动态，尽量避免去有人身安全风险的国家和地区。
          <br>
          文明旅游：营造文明、和谐的旅游环境，关系到每位游客的切身利益。做文明游客是我们大家的义务，克服旅游陋习，倡导文明旅游行为。参考《中国公民出境旅游文明行为指南》。
          <br>
          中国公民，出境旅游，注重礼仪，保持尊严。
          <br>
          讲究卫生，爱护环境；衣着得体，请勿喧哗。
          <br>
          尊老爱幼，助人为乐；女士优先，礼貌谦让。
          <br>
          出行办事，遵守时间；排队有序，不越黄线。
          <br>
          文明住宿，不损用品；安静用餐，请勿浪费。
          <br>
          健康娱乐，有益身心；赌博色情，坚决拒绝。
          <br>
          参观游览，遵守规定；习俗禁忌，切勿冒犯。
          <br>
          遇有疑难，咨询领馆；文明出行，一路平安。
        </p>
      </div>
    </div>
    <div class="modal-footer hide" slot="footer"></div>
  </el-dialog>
</template>

<script>
import entry from './entry'
export default entry
</script>