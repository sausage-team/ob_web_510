import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Home extends Vue {

  public count: number = 0
  public img_list: string[] = [
    'https://n2-q.mafengwo.net/s13/M00/4D/99/wKgEaVzWeoWAUU_bAAs2IhV-Ei449.jpeg?imageMogr2%2Finterlace%2F1',
    'https://b2-q.mafengwo.net/s13/M00/4B/E5/wKgEaVzWeXaAVxyQAAkiLzvilDQ16.jpeg?imageMogr2%2Finterlace%2F1',
    'https://n4-q.mafengwo.net/s13/M00/65/57/wKgEaVzVZ0CAZev-AAlkQYixUeE14.jpeg?imageMogr2%2Finterlace%2F1',
    'https://p2-q.mafengwo.net/s13/M00/95/C7/wKgEaVzT6LKAbcE1AAj3FOEdO0M01.jpeg?imageMogr2%2Finterlace%2F1',
    'https://b4-q.mafengwo.net/s13/M00/42/6D/wKgEaVzSOGWAXY0HAAqIpxTd3O000.jpeg?imageMogr2%2Finterlace%2F1'
  ]

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

  public initIterVal (): void {
    this.interVal = setInterval(() => {
      this.count ++
      this.img = this.img_list[this.count % 5]
    }, 10000)
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

  public mounted (): void {
    this.initIterVal()
    this.initMenuInterVal()
  }
}
