const express = require("express");
const app = express()
const port = 4000;
const mongoose = require("mongoose");
const path =  require("path");
const Chat = require("./models/chat.js")

// method override is used for PUT & DELETE request
const methodOverride = require("method-override")

// add and set ejs file and views folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// add public folder for css & js file 
app.use(express.static(path.join(__dirname, "public")))   
// add this for recieve data from body
app.use(express.urlencoded({extented:true}))

// use of method override syntax
app.use(methodOverride("_method"))




main().then(() => console.log("connection successful"))

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat');


}


// show all chats
app.get("/chats", async (req,res)=>{
   let allChats = await Chat.find()
   res.render("allchats.ejs", {allChats})
})


// add new chat form
app.get("/chats/new", (req,res)=>{
  res.render("create")
})

app.post("/chats", (req,res)=>{
  // fetch data from body
  let {from,to , msg} = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    createAt: new Date()
  })
  console.log(newChat)

  // save chat in mongoDB
  newChat.save().then(res => {console.log("data saved")}).catch((err)=>{
    console.log(err)
  })
  // 
  res.redirect("/chats")
})


// Edit Route
app.get("/chats/:id/edit", async (req,res)=>{
  let {id} = req.params;
  let chats = await Chat.findById(id);
  res.render('update.ejs', {chats})
  
})

// after edit (update Route)
app.put("/chats/:id", async (req,res)=>{
  let {id} = req.params;
  let {msg: newMsg} = req.body
  let updatedMsg = await Chat.findByIdAndUpdate (id, {msg: newMsg},{runValidators:true, new:true})
  console.log(updatedMsg)
  res.redirect("/chats")
})



// delete Route
app.delete("/chats/:id", async (req,res)=>{
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat)
  res.redirect("/chats")
})

// root 
app.get("/", (req,res)=>{
    res.send("server is started")
})











app.listen(port, ()=>{
    console.log(`server is listening on ${port} `)
})