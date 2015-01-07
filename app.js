var express = require('express'),
    http = require('http');

var app = express();
var server = http.createServer(app);

app.use(express.static('public'));

var port = process.env.PORT || 8000;

server.listen(port, function() {
  console.log("Server listening on port: " + port);
});