import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Register extends Vue {

  public registerForm: RegisterForm = new RegisterForm()
  public registerRule: RegisterRule = new RegisterRule(this.registerForm)

  public preferList: any[] = [
    {
      name: '所有',
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
          place: this.registerForm.address,
          address: undefined,
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
  public address: string
  public prefer: number

  constructor () {
    [
      this.user,
      this.password,
      this.confirm,
      this.phone,
      this.address,
      this.prefer
    ] = [ '', '', '', '', '', 0 ]
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
          case 'address':
            return '居住地不能为空'
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
          if (type === 'confirm') {
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
  public address: Rule

  constructor (form: RegisterForm = new RegisterForm()) {
    [
      this.user,
      this.password,
      this.confirm,
      this.phone,
      this.address
    ] = [
      new Rule('user'),
      new Rule('password'),
      new Rule('confirm', true, 'blur', form),
      new Rule('phone'),
      new Rule('address')
    ]
  }
}
