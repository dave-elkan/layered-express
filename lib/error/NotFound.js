var sys = require('sys'),

NotFound = function(message) {
    this.status = 404;
    this.message = message;
};

sys.inherits(NotFound, Error);

module.exports = NotFound;