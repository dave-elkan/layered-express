var IndexView = require('../IndexView');

AuthorIndexView = function() {};

AuthorIndexView.prototype = new IndexView();

AuthorIndexView.prototype.getSection = function() {
    return "author";
};

AuthorIndexView.prototype.getTitle = function(result) {
    return "Authors (" + result.length + ")";
};

module.exports = AuthorIndexView;