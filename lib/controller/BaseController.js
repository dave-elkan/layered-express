var ErrorView = require("../view/ErrorView").ErrorView;

BaseController = function() {
    this.errorView = new ErrorView();
};

BaseController.prototype = function() {};

/**
 * Sets up a GET route.
 */
BaseController.prototype.setupGetRoute = function(app, path, params) {
    var self = this;
    if (!path) {
        throw new Error("No Path specified when creating GET route.");
    }
    
    if (!params.action) {
        throw new Error("No Getter function specified when creating GET route [" + path + "].");
    }
    
    if(!params.views) {
        throw new Error("No Views specified when creating GET route [" + path + "].");
    }
    
    var middleware = [];
    
    /** this needs fixing */
    if (params.middleware) {
        for (var p in params.middleware) {
            middleware.push(params.middleware[p]);
        }
    }
        
    app.get(path, middleware, function(req, res, next) {
        for (var accept in params.views) {
            if (params.views[accept] && req.accepts(accept) && params.views[accept] instanceof BaseView) {
                params.action.call(self, req, res, function(error, result) {
                    if (error) {
                        if (error instanceof Error) {
                            return next(error);
                        } else {
                            return next(new Error(error));
                        }
                    } else {
                        params.views[accept].render(req, res, result);
                    }
                });
                return;
            }
        }
        next();
    });
};

exports.BaseController = BaseController;