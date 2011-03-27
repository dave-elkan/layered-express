var Controller = require('./Controller'),
    HomeView = require('../view/HomeView'),
    jsonView = require('../view/JsonView');
    
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

module.exports = HomeController;