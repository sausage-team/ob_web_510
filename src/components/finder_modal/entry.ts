import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class FinderModal extends Vue {

  @Prop({
    type: Boolean,
    default: false
  }) public value !: boolean

  public finderForm: FinderForm = new FinderForm()
  public finderRule: FinderRule = new FinderRule(this.finderForm)


  public mounted (): void {
    this.$(document).on('focusin', '.item-input > input', (e: any) => {
      this.$(e.target).parent('.item-input').parent('.el-form-item__content').find('label').attr('class', 'show')
    })
    this.$(document).on('blur', '.item-input > input', (e: any) => {
      if (!this.$(e.target).val() || this.$(e.target).val() === '') {
        this.$(e.target).parent('.item-input').parent('.el-form-item__content').find('label').attr('class', '')
      }
    })
  }

  public finder (): void {
    const form: any = this.$refs.finderForm
    form.validate((valid: any) => {
      if (valid) {
        this.homeService.forgetPassword({
          ...this.finderForm,
          username: this.finderForm.user,
          user: undefined
        }).then((res: any) => {
          if (res.status === 0) {
            this.$message.success('找回成功')
            this.close()
          } else {
            this.$message.error(res.msg || '找回失败')
          }
        })
      }
    })
  }

  public close (): void {
    this.$emit('close_finder_modal')
  }

}

class FinderForm {
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
    form: FinderForm = new FinderForm()) {
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

class FinderRule {
  public user: Rule
  public password: Rule
  public confirm: Rule
  public phone: Rule

  constructor (form: FinderForm = new FinderForm()) {
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
