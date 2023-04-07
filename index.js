const RestApi = require("./api/rest-api");

const app = new RestApi();

app.get('/', (req, res) => {
    res.end('Hello World!');
});

app.listen(3000, () => {
    console.log('init server from port 3000');
})

/**
 const express = require('express');
 const bodyParser = require('body-parser');
 const cors = require('cors');
 
 const app = express();
 
 app.use(bodyParser.json());
 app.use(cors());
 
 app.get('/', (req, res) => {
   res.send('API is working');
 });
 
 app.listen(3000, () => {
   console.log('Server started on port 3000');
 });
 * 
 */
