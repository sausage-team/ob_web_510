import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Login extends Vue {

  public loginForm: LoginForm = new LoginForm()
  public loginRule: LoginRule = new LoginRule()

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

  public sigin (): void {
    const form: any = this.$refs.loginForm
    form.validate((valid: any) => {
      if (valid) {
        console.log(1)
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
