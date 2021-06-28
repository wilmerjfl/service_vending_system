import { connect } from 'mongoose'

class MongoDB {

  private URL: string

  constructor(MongoURL: string) {
    this.URL = MongoURL
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