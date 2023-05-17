const mongoose = require("mongoose")

mongoose.set("strictQuery",false);
const connect = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(`DB connected : ${conn.connection.host}`)
    }catch(error){
        console.log(`error at db connectin ${error.message}`)
        process.exit(1)
    }
}

module.exports = connect