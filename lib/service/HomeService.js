var Service = require('../service/Service').Service;

HomeService = function(app) {
    this.app = app;
};

HomeService.prototype = new Service();

/**
 * Returns a list of all Authors and their Books.
 */
HomeService.prototype.getAuthorAndBookList = function(callback) {
    var self = this,
        result = {};
    this.app.bookService.getList(function(error, books) {
        if (error) {
            callback(error);
        } else {
            result.books = books;
            self.app.authorService.getList(function(error, authors) {
                if (error) {
                    callback(error);
                } else {
                    result.authors = authors;
                    callback(null, result);
                }
            });
        }
    })
};

exports.HomeService = HomeService;