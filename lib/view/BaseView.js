BaseView = function() {
    this.title = "eDave's Library";
};

BaseView.prototype = function() {};

BaseView.prototype.getTemplate = function() {
    throw new Error("Must over-ride BaseView::getTemplate in View");
};

BaseView.prototype.getResultTitle = function(result, locale) {
    if (result && result.name) {
        return result.name;
    }
};

BaseView.prototype.render = function(req, res, result) {
    console.log("Rendering with template: ", this.getTemplate());
    res.render(this.getTemplate(), {
		locals: {
		    title: this.getTitle(result),
		    result: result,
		    type: this.type,
		    name: this.name
		}
    });
};

BaseView.prototype.getTitle = function(result) {
    var title = [this.title],
        subTitle = this.getResultTitle(result);
        
    if (subTitle) {
        title.push(subTitle);
    }
    
    return title.join(" - ");
};

exports.BaseView = BaseView;