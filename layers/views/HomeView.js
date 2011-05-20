var BaseView = require('./BaseView');

HomeView = function() {};

HomeView.prototype = new BaseView();

HomeView.prototype.getSection = function() {
    return "home";
};

HomeView.prototype.getTemplate = function() {
    return "home.jade";
};

HomeView.prototype.getTitle = function() {
    return "The Library";
};

module.exports = HomeView;