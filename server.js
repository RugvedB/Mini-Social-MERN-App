var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const path = require("path")
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "frontend", "build")))


io.on('connection', (socket) => {
    console.log('User joined')
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
