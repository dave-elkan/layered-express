BaseService = function() {};

BaseService.prototype = function(){};

BaseService.prototype.getList = function(callback) {
    var params = {
        options: {
            limit: 20
        }
    };
    this.dao.getList(params, callback);
};

BaseService.prototype.getItemByKey = function(key, callback) {
    this.dao.getItemByKey(key, callback);
};

exports.BaseService = BaseService;