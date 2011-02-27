var IndexView = require('../IndexView').IndexView;

AuthorIndexView = function() {
    this.type = "author";
};

AuthorIndexView.prototype = new IndexView();

AuthorIndexView.prototype.getResultTitle = function() {
    return "Authors";
};

exports.AuthorIndexView = AuthorIndexView;