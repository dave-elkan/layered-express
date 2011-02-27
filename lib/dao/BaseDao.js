BaseDao = function() {};

BaseDao.prototype = function() {};

BaseDao.prototype.getCollection = function(callback) {
    var collection = this.collection;
    
    if (!collection) {
        callback("No collection");
    } else {
        callback(null, collection);
    }
};

BaseDao.prototype.getItemCopy = function(item, callback) {
    var copy = {};
    for (var p in item) {
        copy[p] = item[p];
    }
    
    callback(null, copy);
}

BaseDao.prototype.getItemByKey = function(key, callback) {
    this.getItemByField("key", key, callback);
};

BaseDao.prototype.getItemByField = function(field, value, callback) {
    var self = this;
    console.log("Finding by field: " + field + " with value: ", value);
    this.getCollection(function(error, collection) {
        if (error) {
            callback(error);
        } else {
            var item;
            for (var i = 0, ii = collection.length; i < ii; i++) {
                if (collection[i][field] == value) {
                    item = collection[i];
                    break;
                }
            }
            if (!item) {
                callback("Item with " + field + ": " + value + " could not be found in the collection");                
            } else {
                self.getItemCopy(item, callback);
            }
        }
    });
};

BaseDao.prototype.getItemListByField = function(field, value, callback) {
    var self = this;
    this.getCollection(function(error, collection) {
        if (error) {
            callback(error);
        } else {
            var items = [];
            collection.forEach(function(item, i) {
                if (item[field] == value) {
                    items.push(item);
                }
                
                if (i == collection.length - 1) {
                    callback(null, items);
                }
            });
        }
    });
};

BaseDao.prototype.getList = function(key, callback) {
    this.getCollection(function(error, collection) {
        if (error) {
            callback(error);
        } else {
            callback(null, collection);
        }
    });
};

exports.BaseDao = BaseDao;