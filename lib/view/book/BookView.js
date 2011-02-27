var BaseView = require('../BaseView').BaseView;

BookView = function() {};

BookView.prototype = new BaseView();

BookView.prototype.getTemplate = function() {
    return "book.jade";
};

exports.BookView = BookView;