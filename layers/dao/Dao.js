/**
 * Generic DAO.
 * 
 * This DAO implementation fulfills C and R of CRUD.
 * It can create and pull from any collection given a basic 
 * params object.
 *
 * This dao uses a generic-pool connection pool by default.
 *
 * @param pool The generic-pool connection pool.
 * @param collection The name of the collection.
 */
Dao = function(pool, collectionName) {
    this.pool = pool;
    this.collectionName = collectionName;
};

Dao.prototype = function() {};

/**
 * Gets the collection by name using the current collection name.
 */
Dao.prototype.getCollection = function(callback) {
    this.getCollectionByName(this.collectionName, callback);
};

/**
 * Gets a collection by name.
 */
Dao.prototype.getCollectionByName = function(collectionName, callback) {
    var self = this;
    this.pool.borrow(function(client) {
        client.collection(
            collectionName,
            function(error, collection) {
                self.pool.returnToPool(client);
                if (error) {
                    callback(error);
                } else {
                    callback(null, collection);
                }
            }
        );
    });
};

/**
 * Persists a number of items or single item.
 */
Dao.prototype.create = function(items, callback) {
    var self = this;
    this.getCollection(function(error, collection) {
        if (error) {
            callback(error)
        } else {
            if (typeof(items.length) == "undefined") {
                items = [items];
            }

            for (var i = 0, ii = items.length; i < ii; i++) {
                if (items[i]._id) {
                    callback(new Error("Attempting to create asset which is already persisted"));
                    return;
                }
                
                items[i].date_created = new Date();
                items[i].date_updated = new Date();
                items[i].version = 0;
            }

            if (items.length > 0) {
                collection.insert(
                    items,
                    function(error) {
                        callback(error, items);
                    }
                );
            } else {
                callback(null, items);
            }
        }
    });
};

/**
 * Reads a list of items from the datastore.
 */
Dao.prototype.read = function(params, callback) {
    var self = this;
    this.getCollection(function(error, collection) {
        if (error) {
            callback(error);
        } else {
            if (!params.selector) {
                params.selector = {};
            }
            
            if (!params.fields) {
                params.fields = {};
            }
            
            if (!params.options) {
                params.options = {};
            }

            var indexedFields = [];
            for (var field in params.selector) {
                indexedFields.push([field, 1]);
            }

            collection.ensureIndex(indexedFields, function(error, indexName) {
                if (error) {
                    callback(error);
                } else {
                    var operation = (params.options.one) ? collection.findOne : collection.find;
                    operation.call(collection, params.selector, params.fields, params.options, function(error, result) {
                        if (error) {
                            callback(error);
                        } else {
                            if (params.options.one) {
                                callback(null, result)
                            } else {
                                result.toArray(function(error, results) {
                                    if (error) {
                                        callback(error);
                                    } else {
                                        callback(null, results);
                                    }
                                });
                            }
                        }
                    });
                }
            })
        }
    });
};

/**
 * Reads an item by it's unique key.
 */
Dao.prototype.getItemByKey = function(key, callback) {
    this.getItemByField("key", key, callback);
};

/**
 * Reads an item by field value.
 */
Dao.prototype.getItemByField = function(field, value, callback) {
    var self = this;
    var params = {
        selector: {},
        options: {
            one: true
        }
    };
    params.selector[field] = value;
    this.read(params, callback);
};

/**
 * Reads a list of items by field value
 */
Dao.prototype.getItemListByField = function(field, value, callback) {
    var params = {
        selector: {}
    };
    params.selector[field] = value;
    this.read(params, callback);
};

/**
 * Reads a list of items from the current collection
 */
Dao.prototype.getList = function(options, callback) {
    this.read(options, callback);
};

module.exports = Dao;
