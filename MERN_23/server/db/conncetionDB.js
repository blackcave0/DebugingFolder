const mongoose = require('mongoose');

// Initilization database from config file 
const urlDataBase = process.env.DATABASE;

// Checking database connected or not
mongoose.connect(urlDataBase)
.then(()=>{
  console.log('Connection Establised');
}).catch((error) => {console.log(error);})