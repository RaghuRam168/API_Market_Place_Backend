const express = require('express')
const mongoose = require('mongoose')
const app=express()
const dotenv = require('dotenv')
const routerUrl = require('./Routes/routes')
const cors = require('cors')
const connection = require('./utils/connection')
app.use(cors())
app.use(express.json({limit: '50mb'}))
// app.use('/',(req,res) => {
//     res.send("<h1>hello</h1>")
// })
dotenv.config();
//connection();
mongoose.connect(process.env.DATABASE_ACCESS,()=>console.log("Connected to data base"))
app.get('/',(req,res)=>{
    res.send("<h1>Raghu</h1>");
})
app.use('/api',routerUrl)
const port = process.env.POR || 4000
app.listen(port,() => console.log("Running  "+port))
