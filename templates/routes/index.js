var fs     = require('co-fs')
  , parse  = require('co-body')
  ;


// Route definitions

/**
 * Default route.
 */
exports.index = function *() {
  this.result.body = yield fs.readFile(__dirname + '../README.md');
};


