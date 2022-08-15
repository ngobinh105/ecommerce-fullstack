import app from './app'
import database from './database'

database
  .init()
  .then(async () => {
    console.log('database is successfully initialized')
    app.listen(app.get('port'), () => {
      console.log('server is listening at port', app.get('port'))
    })
  })
  .catch((e) => console.log(e))
