import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class PersonModal extends Vue {

  @Prop({
    type: Boolean,
    default: false
  }) public value !: boolean

  public showPrefer: boolean = false

  public showPlace: boolean = false

  public userData: any = this.cookies.get('user_data') ? JSON.parse(this.cookies.get('user_data')) : {}

  public new_password: string = ''

  public show_new_password: boolean = false

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

  public cancelPrefer (): void {
    this.userData.prefer = JSON.parse(this.cookies.get('userData')).prefer
    this.showPrefer = false
  }

  public cancelPlace (): void {
    this.userData.place = JSON.parse(this.cookies.get('userData')).place
    this.showPlace = false
  }

  public saveUserData (type: string): void {
    if (!this.userData.place) {
      this.$message.error('居住地不能为空')
      return
    }
    this.homeService.saveUser(this.userData).then((res: any) => {
      if (res.status === 0) {
        switch (type) {
          case 'prefer':
          default:
            this.showPrefer = false
            break
          case 'place':
            this.showPlace = false
            break
        }
        this.cookies.set('user_data', this.userData)
      } else {
        this.$message.error(res.msg || '修改失败')
      }
    })
  }

  public reset_new_password (): void {
    this.$confirm('是否重置密码?重置密码成功后下次登录将使用新密码！！！', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.new_password = Math.random().toString().slice(-6)
      this.homeService.resetPassword({
        password: this.new_password
      }).then((res: any) => {
        if (res.status === 0) {
          this.show_new_password = true
        } else {
          this.$message.error(res.msg || '重置失败')
        }
      })
    })
  }

  public close (): void {
    this.$emit('close_person_modal')
  }

}
