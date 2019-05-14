import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Examine extends Vue {

  public art_list: any[] = []
  public params: any = {
    offset: 0,
    count: 2000
  }

  public search (): void {
    this.homeService.getExamineList(this.params).then((res: any) => {
      if (res.status === 0) {
        this.art_list = res.data.articles
      }
    })
  }

  public approve (e: any, item: any): void {
    this.homeService.approveArticle({
      pk: item.id,
      status: 2
    }).then((res: any) => {
      if (res.status === 0) {
        this.$message.success('审核通过')
        this.init()
      } else {
        this.$message.error(res.msg || '审核失败')
      }
    })
  }

  public reject (e: any, item: any): void {
    this.homeService.approveArticle({
      pk: item.id,
      status: 3
    }).then((res: any) => {
      if (res.status === 0) {
        this.$message.success('拒绝通过')
        this.init()
      } else {
        this.$message.error(res.msg || '拒绝失败')
      }
    })
  }

  public init (): void {
    this.search()
  }

  public created () {
    this.init()
  }

}
