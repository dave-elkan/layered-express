var IndexView = require('../IndexView').IndexView;

AuthorIndexView = function() {
    this.type = "author";
    this.name = "Authors";
};

AuthorIndexView.prototype = new IndexView();

exports.AuthorIndexView = AuthorIndexView;