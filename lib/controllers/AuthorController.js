var AbstractController = require('./AbstractController'),
    AuthorIndexView = require('../view/author/AuthorIndexView'),
    AuthorView = require('../view/author/AuthorView'),
    JsonView = require('../view/JsonView');
    
AuthorController = function(app) {
    this.authorService = app.authorService;
    var authorIndexView = new AuthorIndexView,
        authorView = new AuthorView,
        jsonView = new JsonView;
    
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

AuthorController.prototype = new AbstractController();

AuthorController.prototype.getAuthorList = function(req, res, callback) {
    this.authorService.getList(callback);
};

AuthorController.prototype.getAuthorByKey = function(req, res, callback) {
    var authorKey = req.params.key;
    this.authorService.getAuthorAndTheirBooks(authorKey, callback);
};

module.exports = AuthorController;