var BaseService = require('./BaseService');

HomeService = function(app) {
    this.app = app;
};

HomeService.prototype = new BaseService();

/**
 * Returns a list of all Authors and their Books.
 */
HomeService.prototype.getAuthorAndBookList = function(callback) {
    var self = this,
        result = {};
    this.app.services.bookService.getList(function(error, books) {
        if (error) {
            callback(error);
        } else {
            result.books = books;
            self.app.services.authorService.getList(function(error, authors) {
                if (error) {
                    callback(error);
                } else {
                    result.authors = authors;
                    callback(null, result);
                }
            });
        }
    });
};

module.exports = function(app) {
    return new HomeService(app);
};