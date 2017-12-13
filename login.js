var express = require('express');
var path = require('path');
var auth = require('basic-auth');

var auth = function(req, res) {
    
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
};
module.exports = auth;