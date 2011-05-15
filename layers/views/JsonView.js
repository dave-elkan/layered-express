var BaseView = require('./BaseView');

JsonView = function() {};

JsonView.prototype = new BaseView();

/**
 * Simply sends the serialised object.
 *
 * @param {Object}  req     The request object.
 * @param {Object}  res     The response object.
 * @param {Object}  result  The object(s) being rendered.
 */
JsonView.prototype.render = function(req, res, result) {
    res.send(result);
};

module.exports = JsonView;