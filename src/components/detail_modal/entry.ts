import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class DetailModal extends Vue {

  @Prop({
    type: String,
    default: ''
  }) public artId !: string

  @Prop({
    type: Boolean,
    default: false
  }) public value !: boolean

  public imgUrl: any = localStorage.getItem('icon')

  public artData: any = {}

  public close (): void {
    this.$emit('close_detail_modal')
  }

  @Watch('value')
  public changeValue (newVal: boolean): void {
    if (newVal) {
      this.homeService.getArticleItem({
        pk: this.artId
      }).then((res: any) => {
        if (res.status === 0) {
          this.artData = res.data
        }
      })
    }
  }

}
