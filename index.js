const RestApi = require("./api/rest-api");

const app = new RestApi();

app.get('/', (req, res) => {
    res.end('Hello World!');
});

app.post('/', (req, res, body) => {
    console.log('[body]', body);
    res.writeHead(201, { 'Content-type': 'application/json' })
    res.end(body);
})

app.listen(3000, () => {
    console.log('init server from port 3000');
})

