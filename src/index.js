const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')

const port = process.env.PORT
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT, DELETE, PATCH',
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization',
  )

  next()
})

app.use(express.json())

app.use(express.static(publicDirectoryPath))

const message = 'Welcome!'

io.on('connection', (socket) => {
  console.log('new websocket connection')

  socket.emit('message', message)

  socket.broadcast.emit('message', 'A new user has joined')

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter()
    if (filter.isProfane(message)) {
      return callback('No bad words allowed!')
    }
    io.emit('message', message)
    callback()
  })

  socket.on('sendLocation', (position, callback) => {
    io.emit(
      'message',
      `https://google.com/maps?q=${position.lat},${position.lon} `,
    )
    callback()
  })

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left.')
  })
})
server.listen(port, () => {
  console.log('Server is up on port ' + port)
})
