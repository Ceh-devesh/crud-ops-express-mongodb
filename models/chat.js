

const mongoose = require("mongoose");


const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true

    },
    to:{
        type: String,
        reqruied: true
    },
    msg:{ 
        type: String,
       
        

    },
    createAt:{
        type: Date,
        reqruied: true,
        default: Date.now
    }
})

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat