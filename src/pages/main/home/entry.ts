import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'

@Component
export default class Home extends Vue {

  public icon: any = localStorage.getItem('icon')
  public currentPage: number = 1
  public count: number = 0

  public prefer_text: string = '所有分类'
  public order_text: string = '默认排序'

  public prefer_list: any[] = [
    {
      name: '所有分类',
      value: 0
    },
    {
      name: '人文',
      value: 1
    },
    {
      name: '风景',
      value: 2
    },
    {
      name: '美食',
      value: 3
    },
    {
      name: '历史',
      value: 4
    },
    {
      name: '民俗',
      value: 5
    }
  ]

  public order_list: any[] = [
    {
      name: '默认排序',
      value: 0
    },
    {
      name: '点赞数排序',
      value: 1
    },
    {
      name: '浏览量排序',
      value: 2
    }
  ]

  public filter_type: number = 0
  public sort_type: number = 0

  public img_list: any[] = []

  public params: any = {
    offset: 0,
    count: 2000
  }

  public modals: Modal = new Modal()

  public art_id: string = ''

  public art_list: any[] = []

  public img: any = {}

  public interVal: any

  public menuInterVal: any

  public menu_count: number = 0

  public searchText: string = ''

  public fav_list: any[] = []

  @Emit()
  public close_detail_modal (): void {
    this.modals.detail_modal = false
    this.init()
  }

  @Emit()
  public close_tip_modal (): void {
    this.modals.tip_modal = false
  }

  @Emit()
  public close_slider_modal (): void {
    this.modals.slider_modal = false
  }

  public open_slider_modal (): void {
    this.modals.slider_modal = true
  }

  public choose_prefer_filter (e: any, name: string, id: number): void {
    e.stopPropagation()
    this.prefer_text = name
    this.filter_type = id
    this.search()
  }

  public choose_order_filter (e: any, name: string, id: number): void {
    e.stopPropagation()
    this.order_text = name
    this.sort_type = id
    this.search()
  }

  public fav_article (e: any, item: any): void {
    e.stopPropagation()
    this.homeService.collectArticle({
      pk: item.id
    }).then((res: any) => {
      if (res.status === 0) {
        this.$message.success('操作成功')
        this.init()
      } else {
        this.$message.error(res.msg || '操作失败')
      }
    })
  }

  public thumb_article (e: any, item: any): void {
    e.stopPropagation()
    this.homeService.thumbArticle({
      pk: item.id
    }).then((res: any) => {
      if (res.status === 0) {
        this.$message.success('操作成功')
        this.init()
      } else {
        this.$message.error(res.msg || '操作失败')
      }
    })
  }

  public open_tip_modal (): void {
    this.modals.tip_modal = true
  }

  public toDetail (e: any, item: any): void {
    e.stopPropagation()
    this.art_id = item.id + ''
    this.modals.detail_modal = true
  }

  public initIterVal (): void {
    this.interVal = setInterval(() => {
      this.count ++
      if (this.img_list.length > 0) {
        this.img = this.img_list[this.count % this.img_list.length]
      }
    }, 10000)
  }

  public searchList (): void {
    this.params.offset = 0
    this.search()
  }

  public write_art (e: any): void {
    e.stopPropagation()
    this.$router.push({
      name: 'WriteTravelNotes'
    })
  }

  public initMenuInterVal (): void {
    if (this.fav_list && this.fav_list.length > 0) {
      this.menuInterVal = setInterval(() => {
        this.menu_count++
        const tmp: any = this.$refs.slider_menu
        this.$(tmp).animate({
          scrollLeft: (this.menu_count % this.fav_list.length) * 260
        }, 500)
      }, 10000)
    }
  }

  public chooseImg (e: any, index: number = 0): void {
    e.stopPropagation()
    window.clearInterval(this.interVal)
    this.count = index
    this.img = this.img_list[index]
    this.initIterVal()

  }

  public chooseSlider (e: any, index: number): void {
    e.stopPropagation()
    window.clearInterval(this.menuInterVal)
    this.menu_count = index
    const tmp: any = this.$refs.slider_menu
    this.$(tmp).animate({
      scrollLeft: (this.menu_count % this.fav_list.length) * 260
    }, 500)
    this.initMenuInterVal()
  }

  public getFavList () {
    this.homeService.getFavArtList({
      offset: 0,
      count: 5
    }).then((res: any) => {
      if (res.status === 0) {
        this.fav_list = res.data.articles
        this.initMenuInterVal()
      }
    })
  }

  public init (): void {
    this.search()
    this.getFavList()
  }

  public search (): void {
    this.homeService.getArtList({
      ...this.params,
      data: {
        search: this.searchText,
        filter_type: this.filter_type,
        sort_type: this.sort_type
      }
    }).then((res: any) => {
      if (res.status === 0) {
        this.art_list = res.data.articles
        console.log(this.art_list)
        if (this.img_list.length <= 5 && res.data.articles.length > 0) {
          this.img_list = [...res.data.articles].splice(0, 5)
          this.img = this.img_list[0]
          this.menu_count = 0
          this.initIterVal()
        }
      }
    })
  }

  public created (): void {
    this.init()
  }
}

class Modal {
  public detail_modal: boolean
  public tip_modal: boolean
  public slider_modal: boolean

  constructor () {
    [
      this.detail_modal,
      this.tip_modal,
      this.slider_modal
    ] = [
      false,
      false,
      false
    ]
  }
}
