import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Register extends Vue {

  public mounted (): void {
    const num: number = Math.floor(Math.random() * 11) + 1
    const lm: any = this.$refs.register_main
    this.$(lm).attr('class', `flur-box register-bg${num}`)
  }

}
