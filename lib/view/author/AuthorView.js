var BaseView = require('../BaseView').BaseView;

AuthorView = function() {};

AuthorView.prototype = new BaseView();

AuthorView.prototype.getTemplate = function() {
    return "author.jade";
};

exports.AuthorView = AuthorView;