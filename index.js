var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');  
   
});

const users = {};
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('login', function(data){
    console.log('a user ' + data.userId + ' connected');

    users[socket.id] = {
        "connectionTime":new Date(),
        "userName" : data.userId,        
    };
  });
  socket.on('disconnect', function(){
    console.log('user ' + users[socket.id] + ' disconnected');
    delete users[socket.id];
  });
  

});

app.get("/user",(req,res)=>{
    res.status(200).send(users);
  });
PORT = const PORT = process.env.PORT || 8000;
server.listen(PORT);
