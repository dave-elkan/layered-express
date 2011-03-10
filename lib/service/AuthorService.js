var Service = require('../service/Service').Service,
    Dao = require('../dao/Dao').Dao;

AuthorService = function(app) {
    this.app = app;
    this.dao = new Dao(app.pool, "author");
};

AuthorService.prototype = new Service();

AuthorService.prototype.getAuthorAndTheirBooks = function(authorKey, callback) {
    var self = this;
    this.dao.getItemByKey(authorKey, function(error, author) {
        if (error) {
            throw error;
        }
        self.app.bookService.getBooksByAuthor(authorKey, function(error, books) {
            if (error) {
                callback(error);
            } else {
                author.bookList = books;
                callback(null, author);
            }
        });
    });
};

exports.AuthorService = AuthorService;