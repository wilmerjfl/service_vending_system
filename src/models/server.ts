import express, { Application } from 'express'

// Import Routes
import vendingsRoute from '../routes/vendings'

class Server {

  private app: Application
  private port: string
  private node_env: string

  // Define ApiPaths 
  private apiPaths = {
    vendings: '/api/v1/vendings'
  }

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '8080'
    this.node_env = process.env.NODE_ENV || 'production'
    // Define routes
    this.routes()
  }

  routes() {
    this.app.use( this.apiPaths.vendings, vendingsRoute)
  }

  listen() {
    this.app.listen( this.port, () => {
      console.log(`Server in running in ${this.node_env} mode on port ${this.port}`)
    })
  }

}

export default Server