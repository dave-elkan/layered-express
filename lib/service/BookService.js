var Service = require('../service/Service').Service,
    BookDao = require('../dao/BookDao').BookDao;

BookService = function(app) {
    this.app = app;
    this.dao = new BookDao;
};

BookService.prototype = new Service();

BookService.prototype.getBooksByAuthor = function(authorKey, callback) {
    this.dao.getItemListByField("author", authorKey, callback);
};

BookService.prototype.getBookAndItsAuthor = function(bookKey, callback) {
    var self = this;
    this.getItemByKey(bookKey, function(error, book) {
        if (error) {
            callback(error);
        } else {
            self.app.authorService.getItemByKey(book.author, function(error, author) {
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

exports.BookService = BookService;