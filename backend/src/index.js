import app from './app.js'
import {connectDB} from './db.js'

const port = 4000

connectDB()

app.listen(port)
console.log('Server runnign on port', port)