var BaseView = require('../BaseView').BaseView;

AuthorView = function() {
    this.template = "author.jade";
};

AuthorView.prototype = new BaseView();

exports.AuthorView = AuthorView;