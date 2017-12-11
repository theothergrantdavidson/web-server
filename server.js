var express = require('express');
var path = require('path');
var app = express();

// Define the port to run on
app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public/html')));
app.use("/scripts",express.static(path.join(__dirname, 'public/scripts')));
app.use("/css",express.static(path.join(__dirname, 'public/css')));

app.use(function(req, res) {
    //console.log(req);

});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});