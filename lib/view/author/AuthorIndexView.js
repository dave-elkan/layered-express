var IndexView = require('../IndexView').IndexView;

AuthorIndexView = function() {};

AuthorIndexView.prototype = new IndexView();

AuthorIndexView.prototype.getType = function() {
    return "author";
};

AuthorIndexView.prototype.getTitle = function() {
    return "Authors";
};

exports.AuthorIndexView = AuthorIndexView;