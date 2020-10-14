import server from 'http'

export class App {
  constructor () {
    this.app = server.createServer()
  }
  public app: server.Server
}
