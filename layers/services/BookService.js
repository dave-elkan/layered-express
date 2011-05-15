var BaseService = require('./BaseService'),
    NotFound = require("../../lib/error/NotFound"),
    Dao = require('../dao/Dao');

BookService = function(app) {
    this.dao = new Dao(app.pool, "book");
    this.app = app;
};

BookService.prototype = new BaseService();

/**
 * Retrieves a list of Books by Author.
 *
 * @param {String}   authorKey The key of the Author of whose books to return.
 * @param {Function} callback  The function to call when retrieval is complete.
 */
BookService.prototype.getBooksByAuthor = function(authorKey, callback) {
    this.dao.getItemListByField("author", authorKey, callback);
};

/**
 * Retrieves a Book and it's Author by key.
 *
 * @param {String}   bookKey   The key of the Book to return.
 * @param {Function} callback  The function to call when retrieval is complete.
 */
BookService.prototype.getBookAndItsAuthor = function(bookKey, callback) {
    var self = this;
    this.dao.getItemByKey(bookKey, function(error, book) {
        if (error) {
            callback(error);
        } else if (!book) {
            callback(new NotFound("Book not found"));
        } else {
            self.app.services.authorService.getItemByKey(book.author, function(error, author) {
                if (error) {
                    callback(error);
                } else {
                    book.authorDetails = author;
                    callback(null, book);
                }
            });
        }
    });
};

module.exports = BookService;