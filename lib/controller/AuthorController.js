var Controller = require('./Controller').Controller,
    AuthorIndexView = require('../view/author/AuthorIndexView').AuthorIndexView,
    AuthorView = require('../view/author/AuthorView').AuthorView,
    jsonView = require('../view/JsonView').jsonView;
    
AuthorController = function(app) {
    this.authorService = app.authorService;
    var authorIndexView = new AuthorIndexView,
        authorView = new AuthorView;
    
    /**
     * GET index
     */
    this.setupGetRoute(app, "/authors", {
        action: this.getAuthorList,
        views: {
            "json": jsonView,
            "html": authorIndexView
        }
    });
    
    /**
     * GET author by key
     */
    this.setupGetRoute(app, "/author/:key", {
        action: this.getAuthorByKey,
        views: {
            "json": jsonView,
            "html": authorView
        }
    });
};

AuthorController.prototype = new Controller();

AuthorController.prototype.getAuthorList = function(req, res, callback) {
    this.authorService.getList(callback);
};

AuthorController.prototype.getAuthorByKey = function(req, res, callback) {
    var authorKey = req.params.key;
    this.authorService.getAuthorAndTheirBooks(authorKey, callback);
};

exports.AuthorController = AuthorController;
