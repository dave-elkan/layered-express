var IndexView = require('../IndexView').IndexView;

BookIndexView = function() {
    this.type = "book";
    this.name = "Books";
};

BookIndexView.prototype = new IndexView();

exports.BookIndexView = BookIndexView;