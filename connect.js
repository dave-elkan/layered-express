var connect = require('connect'),
    Layers = require('layers').Connect,
    server = connect(
        connect.logger(),
        connect.static(__dirname + '/public')
    ),
    Db = require('mongodb').Db,
    ObjectId = require('mongodb').ObjectId,
    Server = require('mongodb').Server,
    GenericPool = require('generic-pool');
    
    server.pool = GenericPool.Pool({
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

    
    layeredApp = new Layers(server, __dirname + '/layers', require('./lib/routes/routes'));

    
server.listen(3000);