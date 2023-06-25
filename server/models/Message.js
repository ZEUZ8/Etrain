const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    conversationId:{
        type:String,
    },
    sender:{
        type:String
    },
    text:{
        type:String
    }
},
{timestamps:true})

const message = mongoose.model("messages",messageSchema)

module.exports = message 