import HeaderNav from './header_nav/index.vue'
import DetailModal from './detail_modal/index.vue'

interface ComponentBase {
  init (vue: any): void
}

class GlobalComponents {
  public init (vue: any) {
    vue.component('HeaderNav', HeaderNav)
    vue.component('DetailModal', DetailModal)
  }
}

export default new GlobalComponents()
