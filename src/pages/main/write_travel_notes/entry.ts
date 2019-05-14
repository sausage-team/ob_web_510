import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class WriteTravelNotes extends Vue {

  public value: string = ''
  public imgUrl: string = ''

  public editor: any

  public title: string = ''

  public dialogImageUrl: string = ''

  public dialogVisible: boolean = false

  public mounted (): void {
    this.editor = this.CKEDITOR.replace('editor', {
      filebrowserImageUploadUrl: '/api/article/cover?type=image'
    })
  }

  public filecheck (file: any): boolean {
    if (file) {
      const tmp: string[] = file.name.split('.')
      const prefix = tmp[tmp.length - 1]
      const test: RegExp = /^[png|jpeg|jpg|bmp|svg]/g
      if (test.test(prefix)) {
        return true
      } else {
        this.$message.error('文件格式错误')
        return false
      }
    } else {
      return false
    }
  }

  public handlesuccess (response: any): void {
    if (response) {
      this.imgUrl = response.url
    }
  }

  public handleRemove (file: any, fileList: any[]): void {
    this.imgUrl = ''
  }

  public handlePictureCardPreview (file: any): void {
    this.dialogImageUrl = file.url
    console.log(this.dialogImageUrl)
    this.dialogVisible = true
  }

  public ok (): void {
    const text: string = this.editor.document.getBody().getText()
    const htmlText: string = this.editor.getData()
    if (!this.cookies.get('user_data')) {
      this.$message.error('请登录')
      this.$router.push({
        name: 'login'
      })
      return
    }
    const userData = JSON.parse(this.cookies.get('user_data'))
    if (!this.title) {
      this.$message.error('标题不能为空')
      return
    }
    if (!this.imgUrl) {
      this.$message.error('封面图片不能为空')
      return
    }
    if (!htmlText) {
      this.$message.error('内容不能为空')
      return
    }

    this.homeService.saveAticle({
      title: this.title,
      author: userData.username,
      cover: this.imgUrl,
      preview: text,
      content: htmlText
    }).then((res: any) => {
      if (res.status === 0) {
        this.$message.success('保存成功')
        this.$router.push({
          name: 'home'
        })
      } else {
        this.$message.error(res.msg || '保存失败')
      }
    })
  }
}
