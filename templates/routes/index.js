var parse  = require('co-body')
  ;


// Route definitions

/**
 * Default route.
 */
exports.index = function *() {
  this.result.body = yield "Hello World!";
};

