var Dao = require("../lib/dao/Dao").Dao,
    assert = require('assert');

function setMockCollection(dao, results) {
    dao.getCollectionByName = function(name, callback) {
        callback(null, {
            find: function(params, fields, options, callback) {
                callback(null, {
                    toArray: function(callback) {
                        callback(null, results);
                    }
                });
            }, 

            findOne: function(params, fields, options, callback) {
                callback(null, results[0]);
            },

            ensureIndex: function(indexDetails, callback) {
                callback(null)
            },
            
            insert: function(items, callback) {
                callback(null, results);
            }
        });
    };

}

exports["TestDaoArrayRead"] = function() {
    var dao = new Dao(),
        expectedResult = 
            [
                {
                    name: "test 1",
                    _id: "test-1"
                },
                {
                    name: "test 2",
                    _id: "test-2"
                }
            ];
        
    setMockCollection(dao, expectedResult);
    
    var params = {};
    
    dao.read(params, function(error, result) {
        assert.isNull(error);
        assert.equal(result, expectedResult)
    });
};

exports["TestDaoSingleRead"] = function() {
    var dao = new Dao(),
        expectedResult = 
            [
                {
                    name: "test 1",
                    _id: "test-1"
                },
                {
                    name: "test 2",
                    _id: "test-2"
                }
            ];
        
    setMockCollection(dao, expectedResult);
    
    var params = {
        options: {
            one: true
        }
    };
    
    dao.read(params, function(error, result) {
        assert.isNull(error);
        assert.equal(result, expectedResult[0])
    });
};

exports["TestDaoWriteSingleItem"] = function() {
    var dao = new Dao(),
        expectedResult = {
            name: "test 1"
        };
        
    setMockCollection(dao, expectedResult);
    
    var params = {};
    
    dao.create(expectedResult, function(error, result) {
        assert.isNull(error);
        result.forEach(function(item) {
            assert.isNotNull(item.date_created);
            assert.isNotNull(item.date_updated);
            assert.isNotNull(item.version);
        });
    });
};

exports["TestDaoWriteArray"] = function() {
    var dao = new Dao(),
        expectedResult = 
            [
                {
                    name: "test 1"
                },
                {
                    name: "test 2"
                }
            ];
        
    setMockCollection(dao, expectedResult);
    
    var params = {};
    
    dao.create(expectedResult, function(error, result) {
        assert.isNull(error);
        result.forEach(function(item) {
            assert.isNotNull(item.date_created);
            assert.isNotNull(item.date_updated);
            assert.isNotNull(item.version);
        });
    });
};