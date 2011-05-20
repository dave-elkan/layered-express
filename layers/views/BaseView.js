var BaseExpressView = require('layers').BaseExpressView,
    ErrorView = require('./ErrorView'),
    errorView = new ErrorView();

BaseView = function() {};

BaseView.prototype = new BaseExpressView();

/**
 * Returns the parameters required to render a page.
 * Title, the Type and the model from the datastore.
 * 
 * @param result The result object from the datastore.
 */
BaseView.prototype.getRenderParameters = function(result) {
    var self = this;
    return {
        locals: {
            title: self.getTitle(result),
            section: self.getSection(),
            result: result
        }
    };
};

/**
 * Returns the error view singleton.
 */
BaseView.prototype.getErrorView = function() {
    return errorView;
};

/**
 * Returns a generic title for the page.
 *
 * @param {Object}  result  The result object (assumed to have a title property).
 */
BaseView.prototype.getTitle = function(result) {
    if (result && result.title) {
        return result.title;
    }
};

BaseView.prototype.toString = function() {
    return this.getTitle();
};

module.exports = BaseView;
