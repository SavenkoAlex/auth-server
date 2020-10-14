import { IncomingMessage, ServerResponse } from 'http'
import { Router } from '../router'

export class AuthRouter {
  constructor (router: Router) {
    this.router = router
  }
  private router: Router

  public init (): void {
    this.router.get({ path: '/test', fn: testRouter })
  }
}

function testRouter (req: IncomingMessage, res: ServerResponse): void {
  res.end('Hello World')
}

