var View = require('./View').View;

HomeView = function() {};

HomeView.prototype = new View();

HomeView.prototype.getType = function() {
    return "home";
};

HomeView.prototype.getTemplate = function() {
    return "home.jade";
};

HomeView.prototype.getTitle = function() {
    return "Home";
};

exports.HomeView = HomeView;