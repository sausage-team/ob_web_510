import HeaderNav from './header_nav/index.vue'

interface ComponentBase {
  init (vue: any): void
}

class GlobalComponents {
  public init (vue: any) {
    vue.component('HeaderNav', HeaderNav)
  }
}

export default new GlobalComponents()
