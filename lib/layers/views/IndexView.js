var BaseView = require('./BaseView');

IndexView = function() {};

IndexView.prototype = new BaseView();

IndexView.prototype.getTemplate = function() {
    return "index.jade";
};

module.exports = IndexView;