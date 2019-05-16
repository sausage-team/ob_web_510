import HeaderNav from './header_nav/index.vue'
import DetailModal from './detail_modal/index.vue'
import TipModal from './tip_modal/index.vue'
import PersonModal from './person_modal/index.vue'
import FinderModal from './finder_modal/index.vue'

interface ComponentBase {
  init (vue: any): void
}

class GlobalComponents {
  public init (vue: any) {
    vue.component('HeaderNav', HeaderNav)
    vue.component('DetailModal', DetailModal)
    vue.component('TipModal', TipModal)
    vue.component('PersonModal', PersonModal)
    vue.component('FinderModal', FinderModal)
  }
}

export default new GlobalComponents()
