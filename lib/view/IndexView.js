var BaseView = require('./BaseView').BaseView;

IndexView = function() {};

IndexView.prototype = new BaseView();

IndexView.prototype.getTemplate = function() {
    return "index.jade";
};

IndexView.prototype.getResultTitle = function() {
    return this.name;
};

exports.IndexView = IndexView;