import Axios from 'axios'
import { Message, Loading } from 'element-ui'

interface HttpBase {
  http: any,
  get (str: string, data: object, resolve: any): void,
  delete (str: string, data: object, resolve: any): void,
  put (str: string, data: object, resolve: any): void,
  post (str: string, data: object, resolve: any): void
}

export default class BaseService implements HttpBase {
  public http: any = null
  public loadingInstance: any
  public http_count: number = 0

  constructor () {
    this.http = Axios

    this.http.timeout = 45000

    this.http.interceptors.request.use((config: any) => {
      if (this.http_count === 0) {
        this.loadingInstance = Loading.service({
          fullscreen: true
        })
      }
      this.http_count++
      return config
    }, (error: any) => {
      if (this.http_count > 0) {
        this.loadingInstance.close()
      }
      this.http_count--
      Message.error('加载失败')
      return Promise.reject(error)
    })

    this.http.interceptors.response.use((response: any) => {
      this.http_count--
      if (this.http_count <= 0) {
        this.loadingInstance.close()
      }
      return response
    }, (error: any) => {
      if (this.http_count > 0) {
        this.loadingInstance.close()
      }
      this.http_count--
      if (error.response) {
        switch (error.response.status) {
          case 401:
          case 403:
            Message.error('无权限操作')
            break
        }
      }
      return Promise.reject(error)
    })
  }

  public get (str: string, data: any, resolve: any): void {
    this.http.get(str, {
      params: data || {}
    }).then((res: any) => {
      if (res.status === 200 && res.data.status === 0) {
        resolve(res.data)
      } else {
        resolve(res.data || {
          status: 1,
          msg: '请求失败'
        })
      }
    })
  }

  public delete (str: string, data: any, resolve: any): void {
    this.http.delete(str, {
      params: data || {}
    }).then((res: any) => {
      if (res.status === 200 && res.data.status === 0) {
        resolve(res.data)
      } else {
        resolve(res.data || {
          status: 1,
          msg: '请求失败'
        })
      }
    })
  }

  public put (str: string, data: any, resolve: any): void {
    this.http.put(str, data).then((res: any) => {
      if (res.status === 200 && res.data.status === 0) {
        resolve(res.data)
      } else {
        resolve(res.data || {
          status: 1,
          msg: '请求失败'
        })
      }
    })
  }

  public post (str: string, data: any, resolve: any): void {
    this.http.post(str, data).then((res: any) => {
      if (res.status === 200 && res.data.status === 0) {
        resolve(res.data)
      } else {
        resolve(res.data || {
          status: 1,
          msg: '请求失败'
        })
      }
    })
  }

}

const services: any = {}

const files = require.context('./', false, /\.ts$/)

files.keys().forEach((item: string) => {
  if (item.indexOf('index') === -1) {
    const tmpKey: string = item.replace(/\.\//g, '').replace(/\.ts/g, 'Service')
    services[tmpKey] = files(item).default
  }
})

export {
  services
}
