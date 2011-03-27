var NotFound = require("../error/NotFound"),
    ErrorView = require('../view/ErrorView'),

    errorView = new ErrorView();

module.exports = function notFoundHandler(req, res, next) {
    errorView.render(new NotFound("The requested resource could not be found."), req, res);
};