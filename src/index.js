const express = require('express')
const path = require('path')

const port = process.env.PORT
const app = express()
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

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
