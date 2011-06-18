var IndexView = require('../IndexView');

BookIndexView = function() {};

BookIndexView.prototype = new IndexView();

BookIndexView.prototype.getSection = function() {
    return "book";
}

BookIndexView.prototype.getTitle = function(result) {
    return "Books (" + result.length + ")";
};

module.exports = new BookIndexView;