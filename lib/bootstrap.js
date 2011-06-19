var authors = [
        {
            name: "Neal Stephenson",
            key: "neal-stephenson",
            books: ["snow-crash", "cryptonomicon", "ananthem"]
        },
        {
            name: "William Gibson",
            key: "william-gibson",
            books: ["neuromancer", "virtual-light"]            
        }
    ],
    books = [
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

function bootstrap(app) {
    /** Setup bootstrapial data */
    var authorService = app.services.authorService,
        bookService = app.services.bookService;
        
    authorService.getList(function (error, persistedAuthors) {
        if (error) {
            throw new Error("Error attempting to pre-populate datastore: '" + error.message + "'");
        } else if (persistedAuthors.length == 0) {
            authorService.create(authors, function(err) {
                if (err) {
                    throw err;
                } else {
                    bookService.create(books, function(err) {
                        if (err) {
                            throw err;
                        }
                    });
                }
            });
        }
    });
}

module.exports = bootstrap;