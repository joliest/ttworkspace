const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');
//const morgan = require('morgan');

const app  = express();
//app.use(morgan('combined'));
app.use(bodyParser.json());
//app.use(cors());

app.get('/hello', (req, res) => {
    res.send(
        {
            'message' : 'Hello World'
        }
    );
})

app.listen('8081', function() {
    console.log('Listening to port 8081');
});