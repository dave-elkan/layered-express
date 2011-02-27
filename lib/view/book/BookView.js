var BaseView = require('../BaseView').BaseView;

BookView = function() {
    this.template = "book.jade"
};

BookView.prototype = new BaseView();

exports.BookView = BookView;