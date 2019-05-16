import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Collection extends Vue {

  public art_list: any[] = []

  public search (): void {
    this.homeService.getCollections({}).then((res: any) => {
      if (res.status === 0) {
        this.art_list = res.data.articles
      }
    })
  }

  public deleteArticle (e: any, item: any): void {
    e.stopPropagation()
    this.$confirm('是否移除该条收藏', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.homeService.collectArticle({
        pk: item.id
      }).then((res: any) => {
        if (res.status === 0) {
          this.$message.success('移除成功')
          this.init()
        } else {
          this.$message.error(res.msg || '移除失败')
        }
      })
    })
  }

  public init (): void {
    this.search()
  }

  public created () {
    this.init()
  }

}
