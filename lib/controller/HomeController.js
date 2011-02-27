var BaseController = require('./BaseController').BaseController,
    HomeView = require('../view/HomeView').HomeView,
    jsonView = require('../view/JsonView').jsonView;
    
HomeController = function(app) {
    this.homeService = app.homeService;
    this.bookService = app.bookService;
    this.authorService = app.authorService;
    
    var self = this,
        homeView = new HomeView;
    
    /**
     * GET index
     */
    self.setupGetRoute(app, "/", {
        action: self.getAuthorAndBookList,
        views: {
            "json": jsonView,
            "html": homeView
        }
    });
};

HomeController.prototype = new BaseController();

HomeController.prototype.getAuthorAndBookList = function(req, res, callback) {
    this.homeService.getAuthorAndBookList(callback);
};

exports.HomeController = HomeController;
