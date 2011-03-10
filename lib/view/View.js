View = function() {};

View.prototype = function() {};

View.prototype.getTemplate = function() {
    throw new Error("Must override View::getTemplate()");
};

View.prototype.format = function(result, callback) {
    callback(null, result);
};

View.prototype.render = function(req, res, result) {
    var self = this;
    this.format(result, function(error, result) {
        if (error) {
            throw new Error(error);
        } else {
            res.render(self.getTemplate(), {
        		locals: {
        		    title: self.getTitle(result),
        		    type: self.getType(),
        		    result: result,
        		    actions: self.getActions()
        		}
            });        
        }
    })
};

View.prototype.getActions = function() {
    return {};
}

View.prototype.getTitle = function(result) {
    if (result && result.name) {
        return result.name;
    }
};

exports.View = View;