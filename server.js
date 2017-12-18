var express = require('express');
var path = require('path');
var auth = require('basic-auth');
var session = require('express-session');
var app = express();
var secureRandom = require('secure-random');
const signingKey = secureRandom(256, {type: 'Buffer'});
var nJwt = require('njwt');

// Define the port to run on
app.set('port', 3000);
app.set('trust proxy', 1)
app.use(express.static(path.join(__dirname, 'public/html')));
app.use("/scripts",express.static(path.join(__dirname, 'public/scripts')));
app.use("/css",express.static(path.join(__dirname, 'public/css')));

app.post('/login', function(req, res, next) {
    var user = auth(req);

    if (user.name === "Pippa" && user.pass === "123") {

        var claims = {
            sub: `${user.name}`,
            iss: "http://127.0.0.1:3000",
            scopes: ["profile"]
        }

        var jwt = nJwt.create(claims, signingKey);
        var token = jwt.compact();

        res.writeHead(200, {Location: 'http://127.0.0.1:3000/redirect.html', access_token: `${token}`});
        res.end();
    } else {
        res.status(401);
        console.log(`${user.name} | ${user.pass}`);
        res.end();
    }
    next(); 
});

app.get("/auth", function(req, res, next) {
    var bearer = req.headers.authorization.split( ' ');
    nJwt.verify(bearer[1], signingKey, function(err, verifiedJWT) {
        if (err) {
            console.log(err);
        } else {
            console.log(verifiedJWT);
        }
    });

});



// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});