AuthorController = function() {};

AuthorController.prototype = {
    
    displayAuthorList: function(req, res, callback) {
        this.services.authorService.getList(callback);
    },

    displayAuthorByKey: function(req, res, callback, next) {
        var authorKey = req.params.key;
        if (authorKey.indexOf("1") > -1) {
            callback(new Error("No ones allowed!"));
        } else {
            this.services.authorService.getAuthorAndTheirBooks(authorKey, callback);            
        }
    }
};

module.exports = AuthorController;