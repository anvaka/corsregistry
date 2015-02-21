// Where do we listen to incoming connections?
var port = process.env.PORT || 3000;

// Whitelist of CORS enabled domains:
var whitelist = ['http://127.0.0.1:31337', 'http://npm.anvaka.com', 'http://www.yasiv.com'];

// Where to proxy requests:
var endpoint = 'https://skimdb.npmjs.com';

var express = require('express');
var cors = require('cors');
var proxy = require('express-http-proxy');

var app = express();
app.use('/*', cors(corsOptionsDelegate), createProxyRoute());
app.listen(port, function() {
  console.log('Registry proxy started at: http://localhost:' + port);
});

function createProxyRoute() {
  return proxy(endpoint, {
    forwardPath: function(req) { return req.originalUrl; }
  });
}

function corsOptionsDelegate(req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true
    }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = {
      origin: false
    }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
}
