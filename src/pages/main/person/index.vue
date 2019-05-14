<template>
  <div class="examine-main">
    <div class="examine-header">
      <span>个人游记</span>
    </div>
    <div class="examine-body">
      <el-table
        :data="art_list">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="detail-main">
              <div class="m-box" :style="{'background-image': `url(${props.row.cover})`}"></div>
              <div class="m-con" v-html="props.row.content"></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="封面">
          <template slot-scope="scope">
            <div class="img-box">
              <img :src="scope.row.cover" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="标题"
          prop="title">
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template slot-scope="props">
            <span>{{utils.momentDate(props.row.created_time, 'date_time')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核状态">
          <template slot-scope="props">
            <span class="watting" v-show="props.row.status === 1">审核中</span>
            <span class="approve" v-show="props.row.status === 2">审核通过</span>
            <span class="reject" v-show="props.row.status === 3">审核被拒</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="props">
            <el-button type="danger" icon="el-icon-delete" @click="deleteArticle($event, props.row)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import entry from './entry'
export default entry
</script>