var express = require('express');
var path = require('path');
var auth = require('basic-auth');
var login = require('./login.js');

var app = express();

// Define the port to run on
app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'public/html')));
app.use("/scripts",express.static(path.join(__dirname, 'public/scripts')));
app.use("/css",express.static(path.join(__dirname, 'public/css')));

app.use(function(req, res, next) {

   if (req.url === "/login") {
    var user = auth(req);
        
        if (user.name === "Pippa" && user.pass === "123") {
            res.writeHead(200, {Location: 'http://127.0.0.1:3000/redirect.html'});
            res.end();
        } else {
            res.status(401);
            res.end();
        }
    }       

});




// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});