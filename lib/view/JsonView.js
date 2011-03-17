var View = require('./View').View;

JsonView = function() {};

JsonView.prototype = new View();

JsonView.prototype.render = function(req, res, result) {
    res.send(result);
};

exports.JsonView = JsonView;