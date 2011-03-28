var fs = require('fs');

function loader(app, namespace) {

    var loaded = [],
        path = __dirname + '/' + namespace;
    
    function getClassName(file) {
        return file.substr(0, file.lastIndexOf(".js"));
    }
    
    function getInstanceName(className) {
        return className[0].toLowerCase() + className.substr(1);
    }
    
    var files = fs.readdirSync(path);

    files.forEach(function(file, i) {
        if (file.indexOf("Abstract") == -1) {
            var className = getClassName(file),
                clazz = require(path + "/" + className);
                
            app[getInstanceName(className)] = new clazz(app);
        }
    });
}

module.exports = loader