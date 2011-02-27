var BaseDao = require("./BaseDao").BaseDao;

AuthorDao = function() {
    this.collection = [
        {
            name: "William Gibson",
            key: "william-gibson",
            books: ["neuromancer", "virtual-light"]
        },
        {
            name: "Neal Stephenson",
            key: "neal-stephenson",
            books: ["snow-crash", "cryptonomicon", "ananthem"]
        }  
    ];
};

AuthorDao.prototype = new BaseDao();

exports.AuthorDao = AuthorDao;