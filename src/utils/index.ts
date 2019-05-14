import moment from 'moment'

export class Util {
  public getType (str: string = '') {
    const fieldReg = RegExp(/tb/)
    const folderReg = RegExp(/folder/)
    const dsReg = RegExp(/ds/)

    if (str.match(fieldReg)) {
      return 'field'
    } else if (str.match(folderReg)) {
      return 'folder'
    } else if (str.match(dsReg)) {
      return 'ds'
    } else {
      return ''
    }
  }

  public momentDate (num: any, type: string = '') {
    if (num) {
      if (Object.prototype.toString.call(num) === '[object Date]') {
        num = num.getTime()
      }
      num = Number(num)
      switch (type) {
        case 'date':
          return moment(num).format('YYYY-MM-DD')
        case 'date_h':
          return moment(num).format('YYYY/MM/DD')
        case 'date_time':
          return moment(num).format('YYYY-MM-DD HH:mm:ss')
        case 'data_h_time':
          return moment(num).format('YYYY/MM/DD HH:mm:ss')
        case 'data_h_time_h':
          return moment(num).format('YYYY/MM/DD HH:mm')
        case 'time':
          return moment(num).format('HH:mm:ss')
        case 'time_h':
          return moment(num).format('HH:mm')
      }
    } else {
      return ''
    }
  }

  public fileCheck (checkList: any[], str: string) {
    let res = false
    checkList.forEach((item: any) => {
      if (item.test(str)) {
        res = true
      }
    })
    return res
  }

  public checkListInner (list: any[] = [], item: any, checkStr: string = '') {
    let res = false
    list.forEach((n: any) => {
      if (checkStr && n[checkStr] === item[checkStr]) {
        res = true
      } else if (!checkStr && n === item) {
        res = true
      }
    })
    return res
  }
}

export default new Util()
