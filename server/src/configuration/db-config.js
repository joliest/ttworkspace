
var mysql = require('mysql');

database = {
    user: 'root',
    password: 'Localr00t',
    server: '127.0.0.1',
    database: 'usermanagementdb',
    port: 3306,
    options: {
        encrypt: true
    }
}

exports.init = function(connect_callback) {
    console.log("Initializing module db-mysql");
    initializeConnection(connect_callback);
}

function initializeConnection(connect_callback) {
	console.log('Connecting to mysql');
	console.log(' host='  +  database.server);
	console.log(' database='  +  database.database);
	console.log(' user='  +  database.user);
	console.log(' options='  +  database.options.encrypt);
	console.log('');
    console.log("Initialising module connection");
    
    //create connection
    var connection = mysql.createConnection({
        user: database.user,
        password: database.password,
        host: database.server,
        database: database.database,
        port: database.port,
        options: database.options
    });
    connection.connect();
    connect_callback(connection);
}