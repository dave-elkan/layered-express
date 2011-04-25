var IndexView = require('./IndexView');

BookIndexView = function() {};

BookIndexView.prototype = new IndexView();

BookIndexView.prototype.getType = function() {
    return "book";
}

BookIndexView.prototype.getTitle = function(result) {
    return "Books (" + result.length + ")";
};

module.exports = BookIndexView;