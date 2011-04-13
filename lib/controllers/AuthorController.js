AuthorController = function() {};

AuthorController.prototype.getAuthorList = function(req, res, callback) {
    this.services.authorService.getList(callback);
};

AuthorController.prototype.getAuthorByKey = function(req, res, callback) {
    var authorKey = req.params.key;
    this.services.authorService.getAuthorAndTheirBooks(authorKey, callback);
};

module.exports = AuthorController;