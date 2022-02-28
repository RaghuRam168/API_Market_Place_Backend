const mongoose = require('mongoose')

const connection = async()=>{
    const connectionsParams ={
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
    }
    try {
       const data = await( mongoose.connect(process.env.DATABASE_ACCESS ,connectionsParams,()=>console.log("Connected to database")))
    } catch (error) {
        console.log(error)
        console.log("Not able to connect with database")
    }
}

module.exports =connection;