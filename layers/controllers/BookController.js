BookController = function() {};

BookController.prototype = {
    
    getBookIndex: function(req, res, callback) {
        this.services.bookService.getList(callback);
    },

    getBookByKey: function(req, res, callback) {
        this.services.bookService.getBookAndItsAuthor(req.params.key, callback);
    }
};

module.exports = BookController;
