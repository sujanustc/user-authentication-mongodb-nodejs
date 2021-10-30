const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

//inport routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')



// app.use(bodyParser.urlencoded({ extended: false }))
 
// // parse application/json
// app.use(bodyParser.json())  {userNewUrlParser: true}, 

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT,()=>{
    console.log('connected to db');
})

//middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));





//route middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(port, () => console.log(`Example app listening on ${port} port!`))