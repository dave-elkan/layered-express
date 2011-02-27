var BaseDao = require("./BaseDao").BaseDao;

BookDao = function() {
    this.collection = [
        {
            key: "neuromancer",
            name: "Neuromancer",
            author: "william-gibson"
        },
        {
            key: "virtual-light",
            name: "Virtual Light",
            author: "william-gibson"
        },
        {
            key: "snow-crash",
            name: "Snow Crash",
            author: "neal-stephenson"
        },
        {
            key: "cryptonomicon",
            name: "Cryptonomicon",
            author: "neal-stephenson"
        },
        {
            name: "Ananthem",
            key: "ananthem",
            author: "neal-stephenson"
        }
    ];
};

BookDao.prototype = new BaseDao();

exports.BookDao = BookDao;