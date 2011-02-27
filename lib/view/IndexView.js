var BaseView = require('./BaseView').BaseView;

IndexView = function() {
    this.template = "index.jade";
};

IndexView.prototype = new BaseView();

exports.IndexView = IndexView;