var parse  = require('co-body')
  ;


// Route definitions

/**
 * Default route.
 */
exports.index = function *() {
  this.result.statusCode = 200;
  this.result.body = yield "Hello World!";
};

