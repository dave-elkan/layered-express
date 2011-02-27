var IndexView = require('../IndexView').IndexView;

BookIndexView = function() {
    this.type = "book";
};

BookIndexView.prototype = new IndexView();

BookIndexView.prototype.getResultTitle = function() {
    return "Books";
};

exports.BookIndexView = BookIndexView;