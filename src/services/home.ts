import Service from './'

interface HomeBase<T> {
  getList (data: object): Promise<T>
}

export class HomeService extends Service implements HomeBase<any> {
  constructor () {
    super()
  }

  public getList (data: object): Promise<any> {
    return new Promise((resolve: any) => {
      super.get('/api', data, resolve)
    })
  }

  public getArtList (param: any): Promise<any> {
    return new Promise((resolve: any) => {
      super.get(`/api/article/${param.offset}/${param.count}`, {}, resolve)
    })
  }

  public saveAticle (param: any): Promise<any> {
    return new Promise((resolve: any) => {
      super.post('/api/article', {
        data: param
      }, resolve)
    })
  }

  public login (param: object): Promise<any> {
    return new Promise((resolve: any) => {
      super.post('/api/user/login', {
        data: param
      }, resolve)
    })
  }

  public register (param: object): Promise<any> {
    return new Promise((resolve: any) => {
      super.post('/api/user/register', {
        data: param
      }, resolve)
    })
  }

  public logout (param: object): Promise<any> {
    return new Promise((resolve: any) => {
      super.get('/api/user/logout', param, resolve)
    })
  }
}


export default new HomeService()
