const mongoose = require("mongoose");
const Chat = require("./models/chat.js") 





main().then(() => console.log("connection successful"));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat');


}





let manyChats = ([

   {
        from: "vijay",
        to: "ajay",
        msg: "Hello, how are you?",
        createAt: new Date("2024-10-15T10:15:30")
    },
    {
        from: "deepak",
        to: "rajesh",
        msg: "Hey Rajesh! Long time no see!",
        createAt: new Date("2024-10-15T10:17:45")
    },
    {
        from: "sunita",
        to: "pankaj",
        msg: "Did you finish the project?",
        createAt: new Date("2024-10-15T10:20:00")
    },
    {
        from: "neha",
        to: "vikram",
        msg: "Let's meet tomorrow for coffee.",
        createAt: new Date("2024-10-15T10:22:10")
    },
    {
        from: "rohit",
        to: "kavita",
        msg: "Happy Birthday, Kavita! Hope you have a great day!",
        createAt: new Date("2024-10-15T10:25:30")
    }
])


Chat.insertMany(manyChats)
