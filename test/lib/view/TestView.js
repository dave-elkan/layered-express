var View = require('../../../lib/view/View');

TestView = function() {};

TestView.prototype = new BaseView();

TestView.prototype.getType = function() {
    return "test";
};

TestView.prototype.getTemplate = function() {
    return "test.jade";
};

TestView.prototype.getTitle = function() {
    return "Test";
};

module.exports = TestView;