View = function() {};

View.prototype = function() {};

View.prototype.getTemplate = function() {
    throw new Error("Must override View::getTemplate()");
};

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

/**
 * Placeholder function allowing for the formatting of 
 * objects to be sent to the View layer.
 *
 * @param {Object}   result     The object to format.
 * @param {Function} callback   The function to call when formatting is complete.
 */
View.prototype.format = function(result, callback) {
    callback(null, result);
};

/**
 * Returns a generic title for the page.
 *
 * @param {Object}  result  The result object (assumed to have a name).
 */
View.prototype.getTitle = function(result) {
    if (result && result.name) {
        return result.name;
    }
};

module.exports = View;