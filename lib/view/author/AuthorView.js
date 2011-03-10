var View = require('../View').View;

AuthorView = function() {};

AuthorView.prototype = new View();

AuthorView.prototype.format = function(result, callback) {
    result.name = result.name.toUpperCase();
    callback(null, result);
};

AuthorView.prototype.getType = function() {
    return "author";
};

AuthorView.prototype.getTemplate = function() {
    return "author.jade";
};

exports.AuthorView = AuthorView;