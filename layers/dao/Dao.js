Dao = function(pool, type) {
    this.pool = pool;
    this.type = type;
};

Dao.prototype = function() {};

Dao.prototype.getCollection = function(callback) {
    this.getCollectionByName(this.type, callback);
};

Dao.prototype.getCollectionByName = function(name, callback) {
    var self = this;
    this.pool.borrow(function(client) {
        client.collection(
            name,
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
                    callback(new Error("Attempting to create asset which is persisted"));
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
            
            self.ensureIndex(collection, indexedFields, function(error) {
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

Dao.prototype.ensureIndex = function(collection, indexDetails, callback) {
    collection.ensureIndex(indexDetails, function(error, indexName) {
        if (error) {
            callback(error);
        } else {
            callback(null);
        }
    });
};

Dao.prototype.getItemByKey = function(key, callback) {
    this.getItemByField("key", key, callback);
};

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

Dao.prototype.getItemListByField = function(field, value, callback) {
    var params = {
        selector: {}
    };
    params.selector[field] = value;
    this.read(params, callback);
};

Dao.prototype.getList = function(options, callback) {
    this.read(options, callback);
};

module.exports = Dao;