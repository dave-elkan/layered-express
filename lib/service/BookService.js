var Service = require('../service/Service').Service,
    Dao = require('../dao/Dao').Dao;

BookService = function(app) {
    this.dao = new Dao(app.pool, "book");
    this.app = app;
};

BookService.prototype = new Service();

BookService.prototype.getBooksByAuthor = function(authorKey, callback) {
    this.dao.getItemListByField("author", authorKey, callback);
};

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