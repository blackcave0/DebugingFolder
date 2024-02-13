const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express();

//-- configrationg config file path
dotenv.config({path: './config.env'})
const port = process.env.PORT

//-- Initiliazing Database path
require('./db/conncetionDB')
// require('./model/schemaType')

app.use(express.json())

// -- Router file Initlizing
app.use(require('./router/registration'))
app.use(require('./router/login'))


/* const middleware = (req, res, next) => {
  console.log('Middleware function');
  next()
}
app.get('/about', middleware, (req, res) =>{
  res.send('hiii from about ')
}) */

app.get('/', (req, res)=>{
  res.send('hello form index side')
})

app.listen(port, ()=> {console.log('Listing... ', port);})