AbstractService = function() {};

AbstractService.prototype = function(){};

AbstractService.prototype.get = function(req, res, next, params) {
    var self = this;
    
    if (!params.action) {
        throw new Error("Invalid action");
    }
    
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
}

/**
 * Generic function to create an entry or list of entries for this type.
 */
AbstractService.prototype.create = function(items, callback) {
    this.dao.create(items, callback);
};

/**
 * Generic function to return a list of entries for this type.
 */
AbstractService.prototype.getList = function(callback) {
    var params = {
        options: {
            limit: 20
        }
    };
    this.dao.getList(params, callback);
};

/**
 * Generic function to return an entry for this type by key.
 */
AbstractService.prototype.getItemByKey = function(key, callback) {
    this.dao.getItemByKey(key, callback);
};

module.exports = AbstractService;