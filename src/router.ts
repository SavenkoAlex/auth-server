import * as url from 'url'
import { IncomingMessage, ServerResponse } from 'http'

interface Handler {
  path: String
  fn: Function
}


interface apiHandlers {
  get: Array <Handler>
  post: Array <Handler>
  put: Array <Handler>
  delete: Array <Handler>
  [prop: string]: any
}

export class Router {
  private constructor () {
    this.handlers = {
      get: [],
      post: [],
      put: [],
      delete: []
    }
  }
  private static instance: Router
  private handlers: apiHandlers

  public static getInstance (): Router {
    if (!Router.instance) {
      Router.instance = new Router
    }
    return Router.instance
  }

  // Методы добавления обработчиков запросов
  public get (handler: Handler): void {
    this.handlers.get.push(handler)
  } 
  public post (handler: Handler ): void {
    this.handlers.post.push(handler)
  } 
  public put (handler: Handler): void {
    this.handlers.put.push(handler)
  }

  getMethodType (methodType: string) : string | null {
    return this.handlers.hasOwnProperty(methodType.toLocaleLowerCase()) ? methodType.toLocaleLowerCase() : null
  }
  public execute (req: IncomingMessage) : Function {
    const urlObject : url.UrlObject = url.parse(req.url)
    const handler: Handler = this.handlers[req.method.toLowerCase()]
      .find((el: Handler) =>  el.path === urlObject.pathname)
    return handler ? handler.fn : this.getNotFoundPage 
  }

  private getNotFoundPage (request: IncomingMessage, response: ServerResponse): void {
    response.end('Page not found')
  }
}