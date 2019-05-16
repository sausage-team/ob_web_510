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
      super.post(`/api/article/${param.offset}/${param.count}`, {
        data: param.data
      }, resolve)
    })
  }

  public getFavArtList (param: any): Promise<any> {
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

  public getExamineList (param: any): Promise<any> {
    return new Promise((resolve: any) => {
      super.get(`/api/admin/articles/${param.offset}/${param.count}`, {}, resolve)
    })
  }

  public approveArticle (param: any): Promise<any> {
    return new Promise((resolve: any) => {
      super.put(`/api/admin/article/${param.pk}/${param.status}`, {}, resolve)
    })
  }

  public getPersonArticle (param: any): Promise<any> {
    return new Promise((resolve: any) => {
      super.get(`/api/ucenter/articles`, param, resolve)
    })
  }

  public deleteArticle (param: any): Promise<any> {
    return new Promise((resolve: any) => {
      super.delete(`/api/article/${param.pk}`, {}, resolve)
    })
  }

  public getArticleItem (param: any): Promise<any> {
    return new Promise((resolve: any) => {
      super.get(`/api/article/${param.pk}`, {}, resolve)
    })
  }

  public collectArticle (param: any): Promise<any> {
    return new Promise((resolve: any) => {
      super.put(`/api/article/collect/${param.pk}`, {
        data: {}
      }, resolve)
    })
  }

  public thumbArticle (param: any): Promise<any> {
    return new Promise((resolve: any) => {
      super.put(`/api/article/thumb/${param.pk}`, {
        data: {}
      }, resolve)
    })
  }

  public getCollections (param: any): Promise<any> {
    return new Promise((resolve: any) => {
      super.get(`/api/ucenter/articles/collections`, {}, resolve)
    })
  }

  public saveUser (param: any): Promise<any> {
    return new Promise((resolve: any) => {
      super.put(`/api/ucenter/user`, {
        data: param
      }, resolve)
    })
  }

  public resetPassword (param: any): Promise<any> {
    return new Promise((resolve: any) => {
      super.put(`/api/user/reset`, {
        data: param
      }, resolve)
    })
  }

  public forgetPassword (param: any): Promise<any> {
    return new Promise((resolve: any) => {
      super.put(`/api/user/forget`, {
        data: param
      }, resolve)
    })
  }
}


export default new HomeService()
