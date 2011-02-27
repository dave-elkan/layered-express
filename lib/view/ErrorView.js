var BaseView = require("./BaseView").BaseView;

ErrorView = function(options) {
    var defaults = {
        showStack: false,
        showMessage: false
    };
    for (var p in options) {
        defaults[p] = options[p];
    }
    this.options = defaults;
};

ErrorView.prototype = new BaseView();

ErrorView.prototype.render = function(error, req, res) {
    this.getErrorOutput(error, function(outError) {
        if (req.accepts("json")) {
            res.send({
                error: outError.message
            }, outError.status);
        } else {
            res.render("error.jade", {
                locals: {
                    title: outError.message,
                    error: outError
                },
                status: outError.status
            });
        }
    });
}

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

exports.ErrorView = ErrorView;