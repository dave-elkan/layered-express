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
    loader = require("./lib/loader");
    
app.pool = GenericPool.Pool({
    max: 10,
    create: function(callback) {
        var db = new Db('layeredexpress', new Server("127.0.0.1", 27017, {}));
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

app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function() {
    app.use(express.errorHandler()); 
});

function getInstanceName(className) {
    return className[0].toLowerCase() + className.substr(1);
}

/**
 * Services and Controllers.
 * 
 * These services are instantiated here as singletons and attached to the app object.
 * This prevents the need for services to instantiate new instances of other services 
 * (as they can inter-dependent) which would potentially cause circular issues.
 */
loader(app, "services");
loader(app, "controllers");
loader(app, "views");

var controllers = {},
    routes = require('./lib/routes/routes')(app),
    baseFielder = {
        method: "get",
        headers: {
            "accept": "text/html"
        },
        view: app.views.blankView
    };

for (var path in routes) {
    var fielders = routes[path];
    fielders.forEach(setupRoute);
}

function setupRoute(fielder) {
    fielder = merge(baseFielder, fielder);
    app[fielder.method].call(app, path, [], function(req, res, next) {
        for (var view in fielder.views) {
            if (req.accepts(view)) {
                fielder.action.call(app, req, res, function(error, result) {
                    if (error) {
                        throw error;
                    }
                    fielder.views[view].render(req, res, result);
                });
                return;
            }
        }
    });
}

function merge(base, inst) {
    var merged = {};
    for (var p in base) {
        merged[p] = base[p];
    }
    for (var p in inst) {
        merged[p] = inst[p];
    }
    
    return merged;
}

function doMerge(target, source) {
    for (var p in source) {
        target[p] = source[p];
    }
    
    return target;
}

// Bootstrap Content
require("./lib/bootstrap")(app);

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}