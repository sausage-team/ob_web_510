import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Person extends Vue {

  public art_list: any[] = []

  public search (): void {
    this.homeService.getPersonArticle({}).then((res: any) => {
      if (res.status === 0) {
        this.art_list = res.data.articles
      }
    })
  }

  public deleteArticle (e: any, item: any): void {
    e.stopPropagation()
    this.$confirm('是否删除该条游记', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.homeService.deleteArticle({
        pk: item.id
      }).then((res: any) => {
        if (res.status === 0) {
          this.$message.success('删除成功')
          this.init()
        } else {
          this.$message.error(res.msg || '删除失败')
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
