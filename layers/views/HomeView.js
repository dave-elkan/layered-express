var AbstractView = require('./AbstractView');

HomeView = function() {};

HomeView.prototype = new AbstractView();

HomeView.prototype.getType = function() {
    return "home";
};

HomeView.prototype.getTemplate = function() {
    return "home.jade";
};

HomeView.prototype.getTitle = function() {
    return "Home";
};

module.exports = HomeView;