// import testModule from './test-module.js'

// testModule();

const express = require('express')
const app = express()
const porta = process.env.PORTA || 3000

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(porta)