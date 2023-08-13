const morgan = require('morgan')
const express = require('express');
const app = express();

const router = require('./router')

app.use(morgan('tiny'))

app.use(express.json())

app.use('/files', router)

app.listen(3000, () => { 
  console.log('server run')
} )