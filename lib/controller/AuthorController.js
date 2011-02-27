var BaseController = require('./BaseController').BaseController,
    AuthorIndexView = require('../view/author/AuthorIndexView').AuthorIndexView,
    AuthorView = require('../view/author/AuthorView').AuthorView,
    jsonView = require('../view/JsonView').jsonView;
    
AuthorController = function(app) {
    this.authorService = app.authorService;
    var self = this,
        authorIndexView = new AuthorIndexView,
        authorView = new AuthorView;
    
    /**
     * GET index
     */
    self.setupGetRoute(app, "/authors", {
        action: self.getAuthorList,
        views: {
            "json": jsonView,
            "html": authorIndexView
        }
    });
    
    /**
     * GET author by key
     */
    self.setupGetRoute(app, "/author/:key", {
        action: self.getAuthorById,
        views: {
            "json": jsonView,
            "html": authorView
        }
    });
};

AuthorController.prototype = new BaseController();

AuthorController.prototype.getAuthorList = function(req, res, callback) {
    this.authorService.getList(callback);
};

AuthorController.prototype.getAuthorById = function(req, res, callback) {
    var authorKey = req.params.key;
    this.authorService.getAuthorAndTheirBooks(authorKey, callback);
};

exports.AuthorController = AuthorController;
