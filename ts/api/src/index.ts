import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import router from './routes'
import swaggerDocs from './swagger'

dotenv.config()

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const server = http.createServer(app)

const { PORT } = process.env

app.use('/api/v1', router)

const port = PORT || 8080
app.set('port', port)

server.listen(port, () => {
  console.log(`Server listening at: localhost:${port}`)
  swaggerDocs(app)
})

export default server
