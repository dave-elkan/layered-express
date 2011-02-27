
/**
 * Module dependencies.
 */

var express = require('express'),
    app = module.exports = express.createServer(),
    notFoundHandler = require("./lib/middleware/NotFoundHandler"),
    BookService = require("./lib/service/BookService").BookService,
    BookController = require('./lib/controller/BookController').BookController,
    AuthorService = require("./lib/service/AuthorService").AuthorService,
    AuthorController = require('./lib/controller/AuthorController').AuthorController,
    HomeService = require("./lib/service/HomeService").HomeService,
    HomeController = require('./lib/controller/HomeController').HomeController;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
  app.use(notFoundHandler);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

/**
 * Services.
 * 
 * These services are instantiated here as singletons and attached to the app object.
 * This prevents the need for services to instantiate new instances of other services 
 * (as they are inter-dependent).
 */
app.bookService = new BookService(app);
app.authorService = new AuthorService(app);
app.homeService = new HomeService(app);

// Routes
new BookController(app);
new AuthorController(app);
new HomeController(app);

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}
