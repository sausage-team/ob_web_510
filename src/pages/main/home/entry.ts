import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Home extends Vue {

  public icon: any = localStorage.getItem('icon')
  public currentPage: number = 1
  public count: number = 0
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

  public slider_list1: any[] = [
    {
      title: '票选全球旅行C位榜',
      img: 'https://n2-q.mafengwo.net/s13/M00/56/A8/wKgEaVzOP3yAYrmfAAFDgial_sQ1' +
      '3.jpeg?imageView2%2F2%2Fw%2F260%2Fh%2F178%2Fq%2F90',
      con: '加入中国人保旅行评审团，赢大奖'
    },
    {
      title: '选择南航，爱上悉尼每一秒',
      img: 'https://p4-q.mafengwo.net/s13/M00/B5/14/wKgEaVzFKUaAbtYvAAHsPkx-JKQ05' +
      '.jpeg?imageView2%2F2%2Fw%2F260%2Fh%2F178%2Fq%2F90',
      con: '追着灯光，打卡新南威尔士州'
    },
    {
      title: '巴山大峡谷旅行摄影研习社',
      img: 'https://b1-q.mafengwo.net/s13/M00/A2/E2/wKgEaVycfy2AdX8nAAG2nu3fFV851' +
      '.jpeg?imageView2%2F2%2Fw%2F260%2Fh%2F178%2Fq%2F90',
      con: '免费报名，掌握摄影大师级操作！'
    },
    {
      title: '马蜂窝拍卖行',
      img: 'https://b4-q.mafengwo.net/s8/M00/91/94/wKgBpVWTULKAJN44AABd8Gtn0o437.' +
      'jpeg?imageView2%2F2%2Fw%2F260%2Fh%2F178%2Fq%2F90',
      con: '每周二：拍精美实物奖品！'
    }
  ]

  public img: string = this.img_list[0]

  public interVal: any

  public menuInterVal: any
  public menuInterVal1: any

  public menu_count: number = 0
  public menu_count1: number = 0

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

  public initIterVal (): void {
    this.interVal = setInterval(() => {
      this.count ++
      this.img = this.img_list[this.count % 5]
    }, 10000)
  }

  public write_art (e: any): void {
    e.stopPropagation()
    this.$router.push({
      name: 'WriteTravelNotes'
    })
  }

  public initMenuInterVal (): void {
    this.menuInterVal = setInterval(() => {
      this.menu_count++
      const tmp: any = this.$refs.slider_menu
      this.$(tmp).animate({
        scrollLeft: (this.menu_count % 5) * 260
      }, 500)
    }, 10000)
  }

  public initMenuInterVal1 (): void {
    this.menuInterVal1 = setInterval(() => {
      this.menu_count1++
      const tmp: any = this.$refs.slider_menu1
      this.$(tmp).animate({
        scrollLeft: (this.menu_count1 % 4) * 260
      }, 500)
    }, 10000)
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
      scrollLeft: (this.menu_count % 5) * 260
    }, 500)
    this.initMenuInterVal()
  }

  public chooseSlider1 (e: any, index: number): void {
    e.stopPropagation()
    window.clearInterval(this.menuInterVal1)
    this.menu_count1 = index
    const tmp: any = this.$refs.slider_menu1
    this.$(tmp).animate({
      scrollLeft: (this.menu_count1 % 4) * 260
    }, 500)
    this.initMenuInterVal()
  }

  public init (): void {
    this.search()
  }

  public search (): void {
    this.homeService.getArtList(this.params).then((res: any) => {
      if (res.status === 0) {
        this.art_list = res.data.articles
      }
    })
  }

  public mounted (): void {
    this.initIterVal()
    this.initMenuInterVal()
    this.initMenuInterVal1()
  }

  public created (): void {
    this.init()
  }
}
