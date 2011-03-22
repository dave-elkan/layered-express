var Service = require('../service/Service').Service,
    Dao = require('../dao/Dao').Dao;

BookService = function(app) {
    this.dao = new Dao(app.pool, "book");
    this.app = app;
};

BookService.prototype = new Service();

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
            throw error;
        }
        self.app.authorService.getItemByKey(book.author, function(error, author) {
            if (error) {
                callback(error);
            } else {
                book.authorDetails = author;
                callback(null, book);
            }
        });
    });
};

exports.BookService = BookService;