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

  public img_list: string[] = [
    'https://n2-q.mafengwo.net/s13/M00/4D/99/wKgEaVzWeoWAUU_bAAs2IhV-Ei449.jpeg?imageMogr2%2Finterlace%2F1',
    'https://b2-q.mafengwo.net/s13/M00/4B/E5/wKgEaVzWeXaAVxyQAAkiLzvilDQ16.jpeg?imageMogr2%2Finterlace%2F1',
    'https://n4-q.mafengwo.net/s13/M00/65/57/wKgEaVzVZ0CAZev-AAlkQYixUeE14.jpeg?imageMogr2%2Finterlace%2F1',
    'https://p2-q.mafengwo.net/s13/M00/95/C7/wKgEaVzT6LKAbcE1AAj3FOEdO0M01.jpeg?imageMogr2%2Finterlace%2F1',
    'https://b4-q.mafengwo.net/s13/M00/42/6D/wKgEaVzSOGWAXY0HAAqIpxTd3O000.jpeg?imageMogr2%2Finterlace%2F1'
  ]

  public params: any = {
    offset: 0,
    count: 2000
  }

  public modals: Modal = new Modal()

  public art_id: string = ''

  public art_list: any[] = []

  public slider_list: any[] = [
    {
      title: '夏木尼，小王子的玫瑰城市',
      img: 'https://b3-q.mafengwo.net/s13/M00/71/D6/wKgEaVyd7i6AFjCjAADni5x-vvY89.jpeg',
      con: '夏木尼（Chamounix）是法国勃朗峰脚下最著名的小城，《小王子》里的玫瑰城市，世界登山运动的发源地。'
    },
    {
      title: '暹粒油淋鱼',
      img: 'https://n2-q.mafengwo.net/s13/M00/72/B9/wKgEaVyd7ryAdEkeAADZPC_YEuI86.jpeg',
      con: '默默等待，鱼上桌，迅速夹一口塞在嘴里——我就像个戒烟多日的老烟枪终于抽上了烟，心里的空洞瞬间被填满了。'
    },
    {
      title: '西安：旧长安的画皮',
      img: 'https://n4-q.mafengwo.net/s13/M00/74/67/wKgEaVyd79SAD6lVAAC7rgrAj0E79.jpeg',
      con: '西安这座曾经的13朝古都，在今天更像旧长安的画皮，城墙完整绵延，一切就像一张唐画的影印本。'
    },
    {
      title: '漫山岛',
      img: 'https://n1-q.mafengwo.net/s13/M00/FB/B9/wKgEaVycpr6Ae-TXAAC_Ffkpk0s50.jpeg',
      con: '漫山岛在第二条路上，满眼都是天赋，却偏爱挥霍青山绿水，用自己的方式过小日子，即便强行拖它起来，也得不到结果。'
    },
    {
      title: '胡日尔镇的美术馆',
      img: 'https://n3-q.mafengwo.net/s13/M00/FD/07/wKgEaVycp3-AVimPAADWiqvk6ek72.jpeg',
      con: '我最终从胡日尔的美术馆里带走了一幅画，画的是冬日的萨满岩，是日落时分。'
    }
  ]

  public img: string = this.img_list[0]

  public interVal: any

  public menuInterVal: any

  public menu_count: number = 0

  public menu_list: any[] = [
    {
      name: '自由行',
      text: '旅行就要freestyle'
    },
    {
      name: '跟团游',
      text: '省心省力 行程透明'
    },
    {
      name: '当地游',
      text: '最地道的玩法体验'
    },
    {
      name: '机票',
      text: '特惠一折起'
    },
    {
      name: '签证',
      text: '服务优质 出签率高'
    },
    {
      name: '邮轮',
      text: '移动的海上城堡'
    }
  ]

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
      this.img = this.img_list[this.count % 5]
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
      }
    })
  }

  public mounted (): void {
    this.initIterVal()
    this.initMenuInterVal()
  }

  public created (): void {
    this.init()
  }
}

class Modal {
  public detail_modal: boolean
  public tip_modal: boolean

  constructor () {
    [
      this.detail_modal,
      this.tip_modal
    ] = [
      false,
      false
    ]
  }
}
