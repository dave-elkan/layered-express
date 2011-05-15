var BaseView = require('../BaseView');

BookView = function() {};

BookView.prototype = new BaseView();

BookView.prototype.getType = function() {
    return "book";
};

BookView.prototype.getTitle = function(result) {
    return result.name;
};

BookView.prototype.getTemplate = function() {
    return "book.jade";
};

module.exports = BookView;