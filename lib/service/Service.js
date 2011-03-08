Service = function() {};

Service.prototype = function(){};

Service.prototype.create = function(items, callback) {
    this.dao.create(items, callback);
};

Service.prototype.getList = function(callback) {
    var params = {
        options: {
            limit: 20
        }
    };
    this.dao.getList(params, callback);
};

Service.prototype.getItemByKey = function(key, callback) {
    this.dao.getItemByKey(key, callback);
};

exports.Service = Service;