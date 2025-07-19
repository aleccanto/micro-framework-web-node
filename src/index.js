const Server = require('./server/server');
const HTTP_STATUS = require('./utils/http-status');

const app = new Server();

const list = [];

app.get('/test-get', (req, res) => {
  res.end(JSON.stringify(list));
});

app.post('/test-post', (req, res, body) => {
  if (body == null) {
    res.end();
  }
  const parsedBody = JSON.parse(body);
  list.push(parsedBody);
  res.writeHead(HTTP_STATUS.CREATED, { 'Content-type': 'application/json' });
  res.write(JSON.stringify(parsedBody));
  res.end();
});

app.patch('/test-patch/:id', (req, res, body, params) => {
  res.writeHead(HTTP_STATUS.OK, { 'Content-type': 'application/json' });
  res.write(body);
  res.end();
});

app.listen(3000, () => {});
