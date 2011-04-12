var ErrorView = require("../view/ErrorView");

AbstractController = function() {
    this.errorView = new ErrorView();
};

AbstractController.prototype = function() {};

AbstractController.prototype.get = function(app, params) {
    console.log("arguments");
};

/**
 * Convenience function to set up a GET route.
 * 
 * @param app    {Object} The app to bind the route to.
 * @param path   {String} The path of the route to bind.
 * @param params {Object} The parameters map
 */
AbstractController.prototype.setupGetRoute = function(app, path, params) {
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
    
    if (!params.middleware) {
        params.middleware = [];
    }

    app.get(path, params.middleware, function(req, res, next) {
        for (var accept in params.views) {
            if (params.views[accept] && params.views[accept] instanceof View && req.accepts(accept)) {
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

module.exports = AbstractController;