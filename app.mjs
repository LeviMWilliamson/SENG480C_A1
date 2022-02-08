import assert from 'assert/strict'
import { WebSocketServer } from 'ws'
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'
import express from 'express'

// check for required environment variables
assert.notStrictEqual(process.env.SERIAL_FILE, undefined, 'Must provide SERIAL_FILE environment variable.')
assert.notStrictEqual(process.env.SERIAL_PORT, undefined, 'Must provide SERIAL_PORT environment variable.')
assert.notStrictEqual(process.env.WEBSOCKET_PORT, undefined, 'Must provide WEB_SOCKET_PORT environment variable.')
assert.notStrictEqual(process.env.PORT, undefined, 'Must provide PORT environment variable.')

let sockets = []
const server = new WebSocketServer({ port: process.env.WEBSOCKET_PORT })
server.on('connection', socket => {
	sockets.push(socket)
	socket.on('close', () => {
		sockets = sockets.filter( s => s !== socket )
	})
})

const serialport = new SerialPort(process.env.SERIAL_FILE, { baudRate: Number(process.env.SERIAL_PORT) })
const parser = serialport.pipe(new Readline({ delimiter: '\n' }))
parser.on('data', data => {
	sockets.forEach( socket => socket.send(data) )
})

const app = express()
app.use(express.static('./static/'))
app.listen(process.env.PORT, () => console.log(`HTTP server listening on port ${process.env.PORT}
Web Socket server listening on port ${process.env.WEBSOCKET_PORT}`))

