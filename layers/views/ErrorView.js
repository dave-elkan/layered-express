ErrorView = function(options) {
    var defaults = {
        showStack: false,
        showMessage: false
    };
    for (var p in options) {
        defaults[p] = options[p];
    }
    this.title = "Error";
    this.options = defaults;
};

/**
 * Renders an Error.
 *
 * Renders an error to either text/html or application/json depending on the
 * Accept header of the request.
 *
 * @param {Object}  req     The request object.
 * @param {Object}  res     The response object.
 * @param {Object}  error   The error to render.
 */
ErrorView.prototype.render = function(req, res, error) {
    this.getErrorOutput(error, function(outError) {
        if (req.accepts("json")) {
            res.send({
                error: outError.message
            }, outError.status);
        } else {
            res.render("error.jade", {
                locals: {
                    section: "Error",
                    title: outError.message,
                    error: outError
                },
                status: outError.status
            });
        }
    });
}

/**
 * Returns a sanitised error message for an Error.
 *
 * @param {Object}      error       The error to santitise.
 * @param {Function}    callback    The callback function.
 */
ErrorView.prototype.getErrorOutput = function(error, callback) {
    
    if (!error.status) {
        error.status = 500;
    }
    
    if (!error.message) {
        error.message = "An error occurred";
    }
    
    if (!this.options.showStack || !this.options.dumpExceptions) {
        delete error.stack;
    }
    
    callback(error);
};

module.exports = ErrorView;