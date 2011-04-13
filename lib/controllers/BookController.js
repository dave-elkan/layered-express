BookController = function() {};

BookController.prototype.getBookIndex = function(req, res, callback) {
    this.services.bookService.getList(callback);
};

BookController.prototype.getBookByKey = function(req, res, callback) {
    var bookKey = req.params.key;
    this.services.bookService.getBookAndItsAuthor(bookKey, callback);
};

module.exports = BookController;
