
/**
 * Module dependencies.
 */

var express = require('express'),
    app = module.exports = express.createServer(),
    Db = require('mongodb').Db,
    ObjectId = require('mongodb').ObjectId,
    Server = require('mongodb').Server,
    GenericPool = require('generic-pool'),
    
    notFoundHandler = require("./lib/middleware/NotFoundHandler"),
    BookService = require("./lib/service/BookService").BookService,
    BookController = require('./lib/controller/BookController').BookController,
    AuthorService = require("./lib/service/AuthorService").AuthorService,
    AuthorController = require('./lib/controller/AuthorController').AuthorController,
    HomeService = require("./lib/service/HomeService").HomeService,
    HomeController = require('./lib/controller/HomeController').HomeController;
    
app.pool = GenericPool.Pool({
    max: 10,
    create: function(callback) {
        var db = new Db('layerednode', new Server("127.0.0.1", 27017, {}));
        db.open(function(err, p_client) {
            callback(db);                
        });
    },
    log: false,
    idleTimeOutMillis: 500,
    destroy: function(client) {
        client.close();
    }
});

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
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
 * (as they can inter-dependent) which would potentially cause circular issues.
 */
app.bookService = new BookService(app);
app.authorService = new AuthorService(app);
app.homeService = new HomeService(app);

// Bootstrap Content
require("./lib/bootstrap").bootstrap(app);

// Routes
new BookController(app);
new AuthorController(app);
new HomeController(app);


// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}
