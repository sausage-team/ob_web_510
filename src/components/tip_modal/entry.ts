import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class TipModal extends Vue {

  @Prop({
    type: Boolean,
    default: false
  }) public value !: boolean

  public close (): void {
    this.$emit('close_tip_modal')
  }

}
