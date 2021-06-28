import express, { Application } from 'express'
import cors from 'cors'

// Import Routes
import vendingsRoute from '../routes/vendings'
import MongoDB from '../config/db'

class Server {

  private app: Application
  private port: string
  private node_env: string
  private db: MongoDB

  // Define ApiPaths 
  private apiPaths = {
    vendings: '/api/v1/vendings'
  }

  constructor() {

    this.app = express()
    this.port = process.env.PORT || '8080'
    this.node_env = process.env.NODE_ENV || 'production'

    // Connect to DB MongoDB
    this.db = new MongoDB()
    this.db.connect()

    // Middlewares
    this.middleware()

    // Define routes
    this.routes()
  }

  middleware(): void {
    // CORS
    this.app.use( cors())

    // Parse Body
    this.app.use( express.json())

    // Public folders
    this.app.use( express.static('src/public'))
  }

  routes(): void {
    this.app.use( this.apiPaths.vendings, vendingsRoute)
  }

  listen(): void {
    this.app.listen( this.port, () => {
      console.log(`Server in running in ${this.node_env} mode on port ${this.port}`)
    })
  }

}

export default Server