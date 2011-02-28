View = function() {};

View.prototype = function() {};

View.prototype.getTemplate = function() {
    throw new Error("Must override View::getTemplate()");
};

View.prototype.render = function(req, res, result) {
    res.render(this.getTemplate(), {
		locals: {
		    title: this.getTitle(result),
		    type: this.getType(),
		    result: result
		}
    });
};

View.prototype.getTitle = function(result) {
    if (result && result.name) {
        return result.name;
    }
};

exports.View = View;