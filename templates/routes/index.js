var fs     = require('co-fs')
  , parse  = require('co-body')
  ;


// Route definitions

/**
 * Default route.
 */
exports.index = function *() {
  this.body = yield fs.readFile(__dirname + '../README.md');
};


