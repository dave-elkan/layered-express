AbstractService = function() {};

AbstractService.prototype = function(){};

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