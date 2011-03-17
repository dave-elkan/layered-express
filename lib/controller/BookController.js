var Controller = require('./Controller').Controller,
    BookIndexView = require('../view/book/BookIndexView').BookIndexView,
    BookView = require('../view/book/BookView').BookView,
    JsonView = require('../view/JsonView').JsonView;
    
BookController = function(app) {
    this.bookService = app.bookService;
    var self = this,
        bookIndexView = new BookIndexView,
        bookView = new BookView,
        jsonView = new JsonView;
    
    /**
     * GET index
     */
    self.setupGetRoute(app, "/books", {
        action: self.getBookList,
        views: {
            "json": jsonView,
            "html": bookIndexView
        }
    });
    
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

BookController.prototype = new Controller();

BookController.prototype.getBookList = function(req, res, callback) {
    this.bookService.getList(callback);
};

BookController.prototype.getBookById = function(req, res, callback) {
    var bookKey = req.params.key;
    this.bookService.getBookAndItsAuthor(bookKey, callback);
};

exports.BookController = BookController;
