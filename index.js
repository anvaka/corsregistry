// Where do we listen to incoming connections?
var port = process.env.PORT || 3000;

// Where to proxy requests:
var endpoint = 'https://skimdb.npmjs.com';

var express = require('express');
var proxy = require('express-http-proxy');

var app = express();
app.use('/*', createProxyRoute());
app.listen(port, function() {
  console.log('Registry proxy started at: http://localhost:' + port);
});

function createProxyRoute() {
  return proxy(endpoint, {
    forwardPath: function(req, res) {
      res.set('Access-Control-Allow-Origin', 'http://npm.anvaka.com');
      return req.originalUrl;
    }
  });
}

function corsOptionsDelegate(req, callback) {
  var corsOptions = {
    origin: true
  };
  callback(null, corsOptions); // callback expects two parameters: error and options
}
