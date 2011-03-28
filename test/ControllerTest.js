var express = require('express'),
	connect = require('connect'),
    assert = require('assert'),
    JsonView = require('../lib/view/JsonView'),
    TestView = require('./lib/view/TestView'),
    Controller = require('../lib/controllers/AbstractController');
	
function configureServer(server) {
    server.configure(function(){
      server.set('views', __dirname + '/views');
      server.set('view engine', 'jade');
      server.use(express.bodyParser());
      server.use(express.methodOverride());
      server.use(server.router);
      server.use(express.static(__dirname + '/public'));
    });
    
	return server;
}

exports["testRouteIsSetupAndRespondsAsExpectedInJSON"] = function() {
    var server = configureServer(express.createServer());

    function action(req, res, callback) {
        callback(null, []);
    }

    var controller = new Controller();
    controller.setupGetRoute(server, '/test', {
       action: action,
       views: {
           'json': new JsonView
       }
    });

	assert.response(server,
		{
			url: '/test',
			headers: {
			    "Accept": "application/json"
			},
			timeout: 200
		},
		{
			status: 200,
			headers: {
				'Content-Type': "application/json"
			}
		}
	);
};

exports["testRouteIsSetupAndRespondsAsExpectedInHTML"] = function() {
    var server = configureServer(express.createServer());

    function action(req, res, callback) {
        callback(null, []);
    }

    var controller = new Controller();
    controller.setupGetRoute(server, '/test', {
       action: action,
       views: {
           'html': new TestView
       }
    });

	assert.response(server,
		{
			url: '/test',
			headers: {
			    "Accept": "text/html"
			},
			timeout: 200
		},
		{
			status: 200,
			headers: {
				'Content-Type': "text/html; charset=utf-8"
			}
		}
	);
};

exports["testRouteIsSetupAndMiddlewareIsCalled"] = function(beforeExit) {
    var server = configureServer(express.createServer());

    function action(req, res, callback) {
        callback(null, []);
    }
    
    var middleware = [
        function(req, res, next) {
            middlewareCalls++;
            next();
        },
        function(req, res, next) {
            middlewareCalls++;
            next();
        }
    ],
    middlewareCalls = 0;

    var controller = new Controller();
    controller.setupGetRoute(server, '/test', {
       action: action,
       middleware: middleware,
       views: {
           'html': new TestView
       }
    });

	assert.response(server,
		{
			url: '/test',
			headers: {
			    "Accept": "text/html"
			},
			timeout: 200
		},
		{
			status: 200,
			headers: {
				'Content-Type': "text/html; charset=utf-8"
			}
		}
	);
	
	beforeExit(function() {
	    assert.equal(2, middlewareCalls, "Ensure both middleware calls are made");
	});
};