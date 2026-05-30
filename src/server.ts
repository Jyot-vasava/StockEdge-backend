import dotenv from 'dotenv'
import http from 'http'
import app from './app'
import { connectDatabase } from './config/database'
import { attachMarketSocket } from './sockets/marketSocket'

dotenv.config()

const port = Number(process.env.PORT ?? 8080)
const server = http.createServer(app)

attachMarketSocket(server)

connectDatabase()
  .then(() => {
    server.listen(port, () => {
      console.log(`StockEdge API running on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start StockEdge API', error)
    process.exit(1)
  })
