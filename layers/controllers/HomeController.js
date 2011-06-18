module.exports = {
    getAuthorAndBookList: function(req, res, callback) {
        this.services.homeService.getAuthorAndBookList(callback);
    }
};