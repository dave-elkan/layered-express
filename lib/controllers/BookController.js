var AbstractController = require('./AbstractController'),
    BookIndexView = require('../view/book/BookIndexView'),
    BookView = require('../view/book/BookView'),
    JsonView = require('../view/JsonView');
    
BookController = function(app) {
    var self = this,
        bookIndexView = new BookIndexView,
        bookView = new BookView,
        jsonView = new JsonView;
    
    /**
     * GET book by key
     */
    self.setupGetRoute(app, "/book/:key", {
        action: self.getBookById,
        views: {
            "json": jsonView,
            "html": bookView
        }
    });
};

BookController.prototype = new AbstractController();

BookController.prototype.getBookIndex = function(req, res, next, route) {
    var app = this;
    this.services.bookService.getList(function(error, result) {
        if (error) {
            throw error;
        }
        route.fielder.view.render(req, res, result);
    });
};

BookController.prototype.getBookList = function(req, res, callback) {
    this.bookService.getList(callback);
}

BookController.prototype.getBookById = function(req, res, callback) {
    var bookKey = req.params.key;
    this.bookService.getBookAndItsAuthor(bookKey, callback);
};

module.exports = BookController;
