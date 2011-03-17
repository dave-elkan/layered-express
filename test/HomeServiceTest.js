var HomeService = require("../lib/service/HomeService").HomeService,
    assert = require('assert');

exports["TestHomeServiceAttemptsToGetAListOfAuthorsAndBooks"] = function() {
    var getListCalls = 0,
        books = ["book1", "book2"],
        authors = ["author1", "author2"],
        mockApp = {
        bookService: {
            getList: function(callback) {
                getListCalls++;
                callback(null, books);
            }
        },
        authorService: {
            getList: function(callback) {
                getListCalls++;
                callback(null, authors);
            }
        }
    },
    homeService = new HomeService(mockApp);
    homeService.getAuthorAndBookList(function(error, result) {
        assert.isNull(error);
        assert.equal(result.books, books);
        assert.equal(result.authors, authors);
    });
};

exports["TestHomeServiceReturnsAnErrorWhenItShould"] = function() {
    var books = ["book1", "book2"],
        authors = ["author1", "author2"],
        badError = new Error("An Error"),
        mockApp = {
        bookService: {
            getList: function(callback) {
                callback(badError);
            }
        },
        authorService: {
            getList: function(callback) {
                callback(null, authors);
            }
        }
    },
    homeService = new HomeService(mockApp);
    homeService.getAuthorAndBookList(function(error, result) {
        assert.isNotNull(error);
        assert.equal(error, badError);
        assert.isUndefined(result);
    });
};