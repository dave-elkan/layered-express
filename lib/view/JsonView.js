var BaseView = require('./BaseView').BaseView;

JsonView = function() {};

JsonView.prototype = new BaseView();

JsonView.prototype.render = function(req, res, result) {
    res.send(result);
};

exports.jsonView = new JsonView;