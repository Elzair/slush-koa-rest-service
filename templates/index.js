var http     = require('http')
  , koa      = require('koa')
  , logger   = require('koa-logger')
  , route    = require('koa-route')
  , routes   = require('./routes')
  ;

// Set server's listening port
var port = (process.env.NODE_ENV === 'production') ? 80 : 3000;

// Create koa app
var app = koa();

// middleware
app.use(logger());

// Route middleware
app.use(route.get('/', routes.index));

// Create HTTP Server
http.createServer(app.callback()).listen(port);
console.log('Server listening on port ' + port);
