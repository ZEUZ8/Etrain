const mongoose = require("mongoose")

const ConverSationSchema = mongoose.Schema({
    members:{
        type:Array
    },

},
{timestamps:true})

const Conversation = mongoose.model("conversation",ConverSationSchema)

module.exports = Conversation 