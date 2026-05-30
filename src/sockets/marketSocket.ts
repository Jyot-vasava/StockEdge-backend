import type http from 'http'

export function attachMarketSocket(server: http.Server) {
  server.on('upgrade', (_request, socket) => {
    socket.end('HTTP/1.1 426 Upgrade Required\r\n\r\nStockEdge WebSocket gateway placeholder')
  })
}
