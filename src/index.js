const RestApi = require("./api/rest-api");

const app = new RestApi();

const list = [];

app.get('/', (req, res) => {
    res.end(JSON.stringify(list));
});

app.post('/', (req, res, body) => {
    body = JSON.parse(body);
    list.push(body)
    res.writeHead(201, { 'Content-type': 'application/json' })
    res.write(JSON.stringify(body))
    res.end();
});

app.patch('/:id', (req, res, body) => {
    body = JSON.parse(body);
    console.log(req.url);
});

app.listen(3000, () => {
    console.log('init server from port 3000');
})

