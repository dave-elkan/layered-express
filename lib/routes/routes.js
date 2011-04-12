module.exports = function(app) {
    var controllers = app.controllers;
    return {
        "/books": [{
            action: controllers.bookController.getBookIndex,
            view: new BookIndexView()
        }, {
            action: controllers.bookController.getBookIndex,
            headers: {
                "accept": "application/json"
            },
            view: new JsonView()
        }],
        
        "/authors": [{
            method: "get",
            action: controllers.authorController.getAuthorIndex,
            headers: {
                "accept": "text/html"
            }
        }]
    };
};
