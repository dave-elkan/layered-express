var View = require('./View').View;

HomeView = function() {
    this.name = "home";
};

HomeView.prototype = new View();

HomeView.prototype.getType = function() {
    return this.name;
};

HomeView.prototype.getTemplate = function() {
    return this.name + ".jade";
};

HomeView.prototype.getTitle = function() {
    return "Home";
};

exports.HomeView = HomeView;