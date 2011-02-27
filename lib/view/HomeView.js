var BaseView = require('./BaseView').BaseView;

HomeView = function() {};

HomeView.prototype = new BaseView();

HomeView.prototype.getTemplate = function() {
    return "home.jade";
};

HomeView.prototype.getResultTitle = function() {
    return "Home";
};

exports.HomeView = HomeView;