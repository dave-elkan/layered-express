var View = require('../../../lib/view/View').View;

TestView = function() {};

TestView.prototype = new View();

TestView.prototype.getType = function() {
    return "test";
};

TestView.prototype.getTemplate = function() {
    return "test.jade";
};

TestView.prototype.getTitle = function() {
    return "Test";
};

exports.TestView = TestView;