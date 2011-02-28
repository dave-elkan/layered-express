var Controller = require('./Controller').Controller,
    HomeView = require('../view/HomeView').HomeView,
    jsonView = require('../view/JsonView').jsonView;
    
HomeController = function(app) {
    this.homeService = app.homeService;
    
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

HomeController.prototype = new Controller();

HomeController.prototype.getAuthorAndBookList = function(req, res, callback) {
    this.homeService.getAuthorAndBookList(callback);
};

exports.HomeController = HomeController;
