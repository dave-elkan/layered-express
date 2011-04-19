var AbstractView = require('layers').AbstractView;

View = function() {};

View.prototype = new AbstractView();

/**
 * Renders a view.
 *
 * @param {Object}  req     The request object.
 * @param {Object}  res     The response object.
 * @param {Object}  result  The object(s) being rendered.
 */
View.prototype.render = function(req, res, result) {
    var self = this;
    this.format(result, function(error, result) {
        if (error) {
            throw new Error(error);
        } else {
            res.render(self.getTemplate(), {
        		locals: {
        		    title: self.getTitle(result),
        		    type: self.getType(),
        		    result: result
        		}
            });        
        }
    });
};

View.prototype.getType = function() {
    return this.type;
}

module.exports = View;