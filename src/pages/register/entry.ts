import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Register extends Vue {

  public registerForm: RegisterForm = new RegisterForm()
  public registerRule: RegisterRule = new RegisterRule(this.registerForm)

  public mounted (): void {
    const num: number = Math.floor(Math.random() * 11) + 1
    const lm: any = this.$refs.register_main
    this.$(lm).attr('class', `flur-box register-bg${num}`)

    this.$(document).on('focusin', '.item-input > input', (e: any) => {
      this.$(e.target).parent('.item-input').parent('.el-form-item__content').find('label').attr('class', 'show')
    })
    this.$(document).on('blur', '.item-input > input', (e: any) => {
      if (!this.$(e.target).val() || this.$(e.target).val() === '') {
        this.$(e.target).parent('.item-input').parent('.el-form-item__content').find('label').attr('class', '')
      }
    })
  }

  public register (): void {
    const form: any = this.$refs.registerForm
    form.validate((valid: any) => {
      if (valid) {
        this.homeService.register({
          ...this.registerForm,
          username: this.registerForm.user,
          user: undefined,
          confirm: undefined
        }).then((res: any) => {
          if (res.status === 0) {
            this.$message.success('注册成功')
            this.$router.push({
              name: 'login'
            })
          } else {
            this.$message.error(res.msg || '注册失败')
          }
        })
      }
    })
  }

  public sign (): void {
    this.$router.push({
      name: 'login'
    })
  }
}

class RegisterForm {
  public user: string
  public password: string
  public confirm: string
  public phone: string

  constructor () {
    [
      this.user,
      this.password,
      this.confirm,
      this.phone
    ] = [ '', '', '', '' ]
  }
}

class Rule {
  public require: boolean
  public trigger: string
  public validator: any

  constructor (
    type: string,
    require: boolean = true,
    trigger: string = 'blur',
    form: RegisterForm = new RegisterForm()) {
    let message: string
    {
      message = (() => {
        switch (type) {
          case 'user':
            return '用户名不能为空'
          case 'password':
            return '密码不能为空'
          case 'confirm':
            return '第二次输入不能为空'
          case 'phone':
            return '手机号码不能为空'
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
          if (type === 'confirm') {
            console.log(form)
            if (value !== form.password) {
              callback(new Error('两次密码不一致'))
            }
          }
          callback()
        }
      }
    ]
  }
}

class RegisterRule {
  public user: Rule
  public password: Rule
  public confirm: Rule
  public phone: Rule

  constructor (form: RegisterForm = new RegisterForm()) {
    [
      this.user,
      this.password,
      this.confirm,
      this.phone
    ] = [
      new Rule('user'),
      new Rule('password'),
      new Rule('confirm', true, 'blur', form),
      new Rule('phone')
    ]
  }
}
