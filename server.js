var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const path = require("path")
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Chat = require('./models/Chat')

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "frontend", "build")))


io.on('connection', (socket) => {
    console.log('User joined')
    socket.on('sendInfoToServer',async (data)=>{
        const currUser = data.currentUser
        const frn = data.frn
        const roomName = data.roomName
        
        console.log(currUser.email)
        console.log(frn.email)
        console.log(roomName)
        
        socket.join(roomName)
        
        //get messages of this room
        let chatArray = await Chat.find({ roomName:roomName }).sort({ date: "desc" }).limit(40)
        console.log('chatArray')
        chatArray = chatArray.reverse()

        // socket.broadcast.to(roomName).emit('message', { user: currUser, text: `${currUser.email} has joined!` ,chatArray:chatArray});
        socket.emit('chatData', { chatArray:chatArray});
        console.log('emitted chatData')
        
        
        //io.to(roomName).emit('roomData', { room: roomName, users: getUsersInRoom(user.room) });
    })
    socket.on('newMessage',async (data)=>{
        // {currentUser:currentUser,frn:frn,roomName:roomName,content:msg}
        // {
        //     sender:currentUser.email,
        //     receiver:frn.email,
        //     content:msg
        // }


        const chat = new Chat({
            roomName:data.roomName,
            sender:data.currentUser,
            receiver:data.frn,
            content:data.content
        })
        console.log(JSON.stringify(data.frn.email))
        console.log("Sender : "+data.currentUser.email)
        console.log("Receiver : "+data.frn.email)
        await chat.save().then(res=> console.log(res)).catch(err => console.log(err))
        
        
        socket.broadcast.to(data.roomName).emit('newMessageIncoming', { sender: data.currentUser,receiver:data.frn, content: data.content });
    })
    
});


app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

var Users = require('./routes/Users')
app.use('/users', Users)

mongoose.connect('mongodb+srv://'+process.env.MONGO_USERNAME+':'+process.env.MONGO_PASSWORD+'@node-rest-shop-qoquv.mongodb.net/'+process.env.MONGO_DB_NAME+'?retryWrites=true&w=majority',{
    useNewUrlParser: true
})


//Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

//Very IMP (app -> http)
const port = process.env.PORT
http.listen(port, function() { /////////////////////////// here observe that we have replaces app with http bcoz of socket.io
    console.log('Server is running on port: ' + port)
})
