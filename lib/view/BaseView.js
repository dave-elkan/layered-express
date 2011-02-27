BaseView = function() {
    this.title = "The Library";
};

BaseView.prototype = function() {};

BaseView.prototype.getTemplate = function() {
    return this.template;
};

BaseView.prototype.getResultTitle = function(result) {
    if (result && result.name) {
        return result.name;
    }
};

BaseView.prototype.render = function(req, res, result) {
    res.render(this.getTemplate(), {
		locals: {
		    title: this.getTitle(result),
		    result: result,
		    type: this.type
		}
    });
};

BaseView.prototype.getTitle = function(result) {
    var title = [this.title],
        subTitle = this.getResultTitle(result);
        
    if (subTitle) {
        title.push(subTitle);
    }
    
    return {
        titleArray: title,
        readable: title.join(" - ")
    };
};

exports.BaseView = BaseView;