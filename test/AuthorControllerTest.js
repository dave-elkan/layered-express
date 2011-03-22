var express = require('express'),
	connect = require('connect'),
    assert = require('assert'),
    AuthorController = require('../lib/controller/AuthorController').AuthorController;
	
function configureServer(server) {
	server.configure(function(){
	  server.set('views', __dirname + '/../views');
	  server.use(express.bodyParser());
	  server.use(express.methodOverride());
	  server.use(express.compiler({ src: __dirname + '/../public', enable: ['less'] }));
	  server.use(server.router);
	  server.use(express.static(__dirname + '/../public'));
	});

	return server;
}

exports["testAuthorsRouteIsSetupAndRespondsAsExpectedInJSON"] = function() {
    var server = configureServer(express.createServer());

    function action(callback) {
        callback(null, [
            {
                value: "Author Name 1",
                key: "author-name-1"
            }, {
                value: "Author Name 2",
                key: "author-name-2"          
            }
        ]);
    }
    
    server.authorService = {};
    server.authorService.getList = action;
    
    var controller = new AuthorController(server);    

	assert.response(server,
		{
			url: '/authors',
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

exports["testAuthorsRouteIsSetupAndRespondsAsExpectedInHTML"] = function() {
    var server = configureServer(express.createServer());

    function action(callback) {
        callback(null, [
            {
                value: "Author Name 1",
                key: "author-name-1"
            }, {
                value: "Author Name 2",
                key: "author-name-2"          
            }
        ]);
    }
    
    server.authorService = {};
    server.authorService.getList = action;
    
    var controller = new AuthorController(server);    

	assert.response(server,
		{
			url: '/authors',
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