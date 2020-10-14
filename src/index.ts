import { App } from './app'
// import { html } from './assets/html_login'
import { IncomingMessage, ServerResponse } from 'http'
// import * as url from 'url'
import { Router } from './router'
import { AuthRouter } from './controllers/authController'

const appInstance = new App()
const router = Router.getInstance()
new AuthRouter(router).init()
const port = process.env.PORT || 8088

appInstance.app.on('request', (request: IncomingMessage, response: ServerResponse) => {
  router.execute(request)(request, response)
})
appInstance.app.listen(port, () => {
  console.info(`service is runnning on localhost:${port}`)
})