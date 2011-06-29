var BaseService = require('./BaseService'),
    NotFound = require("../../../lib/error/NotFound"),
    Dao = require('../dao/Dao');

AuthorService = function(app) {
    this.app = app;
    this.dao = new Dao(app.pool, "author");
};

AuthorService.prototype = new BaseService();

/**
 * Retrieves an Author and a list of their Books.
 *
 * @param {String}   authorKey The key of the Author to return.
 * @param {Function} callback  The function to call when retrieval is complete.
 */
AuthorService.prototype.getAuthorAndTheirBooks = function(authorKey, callback) {
    var self = this;
    this.dao.getItemByKey(authorKey, function(error, author) {
        if (error) {
            callback(error);
        } else if (!author) {
            callback(new NotFound("Author not found"));
        } else {
            self.app.services.bookService.getBooksByAuthor(authorKey, function(error, books) {
                if (error) {
                    callback(error);
                } else {
                    author.bookList = books;
                    callback(null, author);
                }
            });
        }
    });
};

module.exports = function(app) {
    return new AuthorService(app);
};