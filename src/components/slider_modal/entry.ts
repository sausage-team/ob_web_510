import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class SliderModal extends Vue {

  @Prop({
    type: Boolean,
    default: false
  }) public value !: boolean

  @Prop({
    type: Object,
    default: ''
  }) public url !: any

  public img_bak: any = {}

  @Watch('value')
  public changeModal (newVal: boolean) {
    if (this.value) {
      this.img_bak = JSON.parse(JSON.stringify(this.url))
    }
  }

  public close (): void {
    this.$emit('close_slider_modal')
  }

}
