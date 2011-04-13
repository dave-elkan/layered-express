AbstractView = function() {};

AbstractView.prototype = function() {};

AbstractView.prototype.getTemplate = function() {
    throw new Error("Must override AbstractView::getTemplate()");
};

/**
 * Renders a view.
 *
 * @param {Object}  req     The request object.
 * @param {Object}  res     The response object.
 * @param {Object}  result  The object(s) being rendered.
 */
AbstractView.prototype.render = function(req, res, result) {
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

/**
 * Placeholder function allowing for the formatting of 
 * objects to be sent to the AbstractView layer.
 *
 * @param {Object}   result     The object to format.
 * @param {Function} callback   The function to call when formatting is complete.
 */
AbstractView.prototype.format = function(result, callback) {
    callback(null, result);
};

/**
 * Returns a generic title for the page.
 *
 * @param {Object}  result  The result object (assumed to have a name).
 */
AbstractView.prototype.getTitle = function(result) {
    if (result && result.name) {
        return result.name;
    }
};

AbstractView.prototype.toString = function() {
    return this.getType();
}

module.exports = AbstractView;