HomeController = function() {};

HomeController.prototype = {
    getAuthorAndBookList: function(req, res, callback) {
        this.services.homeService.getAuthorAndBookList(callback);
    }
};

module.exports = HomeController;