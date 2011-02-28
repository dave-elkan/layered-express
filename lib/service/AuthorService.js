var Service = require('../service/Service').Service,
    AuthorDao = require('../dao/AuthorDao').AuthorDao;

AuthorService = function(app) {
    this.app = app;
    this.dao = new AuthorDao;
};

AuthorService.prototype = new Service();

AuthorService.prototype.getAuthorAndTheirBooks = function(authorKey, callback) {
    var self = this;
    this.getItemByKey(authorKey, function(error, author) {
        if (error) {
            callback(error);
        } else {
            self.app.bookService.getBooksByAuthor(authorKey, function(error, books) {
                if (error) {
                    callback(error);
                } else {
                    author.bookList = books;
                    callback(null, author);
                }
            })
        }
    });
};

exports.AuthorService = AuthorService;