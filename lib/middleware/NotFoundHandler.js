var NotFound = require("../error/NotFound"),
    errorView = require('../../layers/views/ErrorView');

module.exports = function notFoundHandler(req, res, next) {
    errorView.render(req, res, new NotFound("The requested resource could not be found."));
};