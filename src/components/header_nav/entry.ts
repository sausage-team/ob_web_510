import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class HeaderNav extends Vue {

  public activeIndex: string = '1'

  public userData: any = this.cookies.get('user_data') ? JSON.parse(this.cookies.get('user_data')) : {}

  public icon: any = localStorage.getItem('icon')

  public created (): void {
    this.routeCheck()
  }

  public routeCheck (): void {
    switch (this.$route.name) {
      case 'home':
        this.activeIndex = '1'
        break
      case 'examine':
        this.activeIndex = '2'
        break
      case 'person':
        this.activeIndex = '3'
        break
      default:
        this.activeIndex = '1'
        break
    }
  }

  @Watch('$route')
  public routeChange (newVal: any): void {
    this.routeCheck()
  }

  public sign (e: any): void {
    e.stopPropagation()
    this.$router.push({
      name: 'login'
    })
  }

  public register (e: any): void {
    e.stopPropagation()
    this.$router.push({
      name: 'register'
    })
  }

  public viewGo (e: any, type: string): void {
    e.stopPropagation()
    this.$router.push({
      name: type
    })
  }

  public logout (e: any): void {
    this.homeService.logout({}).then((res: any) => {
      if (res.status === 0) {
        this.$message.success('登出成功')
        localStorage.clear()
        this.cookies.remove('user_data')
        this.$router.push({
          name: 'login'
        })
      } else {
        this.$message.error(res.msg || '登出失败')
      }
    })
  }
}
