var express = require('express');
var app = express();
var server = require('http').createServer(app);
app.use(express.static(__dirname + '/public'));



server.listen(process.env.PORT || 5000, function(){
  console.log('listening on port:5000');
});