BaseView = function() {};

BaseView.prototype.getTemplate = function() {
    return "blank.jade"
};

/**
 * Renders a view with title, type and the result of the action
 * or an ErrorView is rendered if an error occurred.
 *
 * @param {Object}  req     The request object.
 * @param {Object}  res     The response object.
 * @param {Object}  result  The object(s) being rendered.
 */
BaseView.prototype.render = function(req, res, result) {
    var self = this;
    this.format(result, function(error, result) {
        if (error) {
            var ErrorView = require('./ErrorView');
            new ErrorView().render(req, res, error);
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

/**
 * Placeholder function allowing for the formatting of 
 * objects to be sent to the BaseView layer.
 *
 * @param {Object}   result     The object to format.
 * @param {Function} callback   The function to call when formatting is complete.
 */
BaseView.prototype.format = function(result, callback) {
    callback(null, result);
};

/**
 * Returns a generic title for the page.
 *
 * @param {Object}  result  The result object (assumed to have a title property).
 */
BaseView.prototype.getTitle = function(result) {
    if (result && result.title) {
        return result.title;
    }
};

BaseView.prototype.toString = function() {
    return this.getTitle();
}

module.exports = BaseView;
