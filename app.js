let express = require('express')
let mongoose = require('mongoose')
const router = require('./routes/UserRoute')
const errorHandler = require('./middlewares/errorHandler')
require('dotenv').config()
let app = express()

//? db connection
mongoose.connect(process.env.STRING)
.then(()=>{
    console.log(`DB connected successfully.`)    
})
.catch((e)=>{
    console.log(`An error occured while connecting to the DB.`)    
})

//? middleware
app.use(express.json())
app.use(errorHandler)

//? routing
app.use('/',router)

//? start the server
app.listen(5000,console.log(`Server is live on http://localhost:5000`))