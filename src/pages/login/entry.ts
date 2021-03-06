import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'

@Component
export default class Login extends Vue {

  public loginForm: LoginForm = new LoginForm()
  public loginRule: LoginRule = new LoginRule()
  public finder_modal: boolean = false

  public mounted (): void {
    const num: number = Math.floor(Math.random() * 11) + 1
    const lm: any = this.$refs.login_main
    this.$(lm).attr('class', `flur-box login-bg${num}`)

    this.$(document).on('focusin', '.item-input > input', (e: any) => {
      this.$(e.target).parent('.item-input').parent('.el-form-item__content').find('label').attr('class', 'show')
    })
    this.$(document).on('blur', '.item-input > input', (e: any) => {
      if (!this.$(e.target).val() || this.$(e.target).val() === '') {
        this.$(e.target).parent('.item-input').parent('.el-form-item__content').find('label').attr('class', '')
      }
    })
  }

  @Emit()
  public close_finder_modal () {
    this.finder_modal = false
  }

  public finder_pwd (): void {
    this.finder_modal = true
  }

  public sigin (): void {
    const form: any = this.$refs.loginForm
    form.validate((valid: any) => {
      if (valid) {
        this.homeService.login({
          ...this.loginForm,
          user: undefined,
          username: this.loginForm.user
        }).then((res: any) => {
          if (res.status === 0) {
            this.$message.success('登陆成功')
            this.cookies.set('user_data', {
              ...res.data,
              icon: undefined
            })
            localStorage.setItem('icon', res.data.icon)
            this.$router.push({
              name: 'home'
            })
          } else {
            this.$message.error(res.msg || '登录失败')
          }
        })
      }
    })
  }

  public register (): void {
    this.$router.push({
      name: 'register'
    })
  }

}

class LoginForm {
  public user: string
  public password: string

  constructor () {
    [ this.user, this.password ] = [ '', '' ]
  }
}

class Rule {
  public require: boolean
  public trigger: string
  public validator: any

  constructor (type: string, require: boolean = true, trigger: string = 'blur') {
    let message: string
    {
      message = (() => {
        switch (type) {
          case 'user':
            return '用户名不能为空'
          case 'password':
            return '密码不能为空'
          default:
            return '用户名不能为空'
        }
      })()
    }
    [
      this.require,
      this.trigger,
      this.validator
    ] = [
      require,
      trigger,
      (rule: any, value: string, callback: any) => {
        if (value === '') {
          callback(new Error(message))
        } else {
          if (type === 'password') {
            if (value.length < 5 || value.length > 16) {
              callback(new Error('密码必须在5~16位'))
            }
          }
          if (type === 'user') {
            if (value.length < 5) {
              callback(new Error('账号长度不能低于5位'))
            } else {
              const user_reg: RegExp = /^[a-zA-Z]{1}[a-zA-z0-9_]+$/g

              if (!user_reg.test(value)) {
                callback(new Error('用户名不合法'))
              }
            }
          }
          callback()
        }
      }
    ]
  }
}

class LoginRule {
  public user: Rule
  public password: Rule

  constructor () {
    [
      this.user,
      this.password
    ] = [
      new Rule('user'),
      new Rule('password')
    ]
  }
}
