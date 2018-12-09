const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app  = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

var connection = require('./configuration/db-config');

app.post('/register', (req, res) => {
    res.send(
        {
            message : `Hello ${req.body.email} was registered! Have fun!`
        }
    );
});

connection.init((conn) => {
        app.listen('8081', function() {
        console.log('Listening to port 8081');
    });
    loadModules(app, conn, function(err, resp) {
        if(resp.status === 'success') {
            console.log('---Initializing Modules---');
        }
    })
})

function loadModules(server, dbConnection, callback) {
    var modules = require('./services/api');

    modules.init(server, dbConnection);

    callback(null, 'success');
}