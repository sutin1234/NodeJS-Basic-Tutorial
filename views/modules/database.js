var mudule_exports = function() {
    var self = this;

    self.getUser = function(callback) {
        var dataReturn = [];
        var mysql = require("mysql");
        var connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "db_nodejs",
            port: 3308
        })
        connection.connect(function() {
            console.log("Connected!");
        });

        connection.query("select * from users", function(error, rows, fields) {
            callback(rows)
        })

        connection.end(function() {
            console.log("Closed!");
        });
    }
}

module.exports = mudule_exports;