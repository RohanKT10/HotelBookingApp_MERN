const mongoose = require("mongoose");

var mongoURL='mongodb+srv://<username>:<password>@cluster.mongodb.net/mern-booking'

mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true})

var connection = mongoose.connection

connection.on('error',()=>{
       console.log('Mongo DB Connection failed')
})

connection.on('connected',()=>{
    console.log('Mongo DB Connection Succes')
})

module.exports = mongoose


