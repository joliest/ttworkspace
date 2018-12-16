var services = require('./services');

module.exports.init = function init(server, dbConnection) {
    server.get('/users', (req, res) => {
        services.getAllUsers(req, res, dbConnection);
    });

    server.get('/user/:id', (req, res) => {
        services.getUserById(req, res, dbConnection);
    });

    server.post('/add', (req, res) => {
        services.addUser(req, res, dbConnection);
    });

    server.post('/update', (req, res) => {
        services.updateUser(req, res, dbConnection);
    });

    server.post('/delete', (req, res) => {
        services.deleteUser(req, res, dbConnection);
    });
}