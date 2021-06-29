import express, { Application } from 'express'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import { morganPersist } from 'morgan-persist'
const rateLimit = require('express-rate-limit')

// Import Routes
import vendingsRoute from '../routes/vendings'
import MongoDB from '../config/db'
class Server {

  private app: Application
  private port: string
  private node_env: string
  private db: MongoDB
  private mongo_url: string

  // Define ApiPaths 
  private apiPaths = {
    vendings: '/api/v1/vendings'
  }

  constructor() {

    this.app = express()
    this.port = process.env.PORT || '5000'
    this.node_env = process.env.NODE_ENV || 'production'

    // Connect to DB MongoDB
    this.mongo_url = `${process.env.MONGO_URL}` ||
    'mongodb://mongo:27017/Vendings'
    this.db = new MongoDB(this.mongo_url)
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
    this.app.use(express.static('src/public'))
    
    // sanitize Mongo
    this.app.use(mongoSanitize())

    // Save Log in database
    this.app.use(morganPersist({
      connectionString: `${process.env.MONGO_URL}` ||
      'mongodb://mongo:27017/Vendings'
    }))

    // Rate limit
    this.app.use(rateLimit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 100
    }))
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