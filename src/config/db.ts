import { connect } from 'mongoose'

class MongoDB {

  private URL: string

  constructor() {
    this.URL = process.env.MONGO_URL ||
      'mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false'
  }

  connect(): void {
    connect(this.URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }).
      then((res) => {
        console.log(`MongoDB Connected: ${res.connection.host}`)
      })
      .catch((err) => {
      console.log(err.message)
    })
  }
}

export default MongoDB