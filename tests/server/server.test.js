const Server = require('../../src/server/server');
const http = require('http');
const HTTP_STATUS = require('../../src/utils/http-status');
const HTTP_METHODS = require('../../src/utils/http-methods');

describe('Server', () => {
  let server;
  let port = 3001;

  beforeEach((done) => {
    port++; // Incrementa a porta para evitar conflitos
    server = new Server();
    server.listen(port, done);
  });

  afterEach((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  it('should handle GET requests', (done) => {
    const testPath = '/test-get';
    const expectedResponse = 'GET request received';

    server.get(testPath, (req, res) => {
      res.end(expectedResponse);
    });

    const options = {
      hostname: 'localhost',
      port: port,
      path: testPath,
      method: HTTP_METHODS.GET,
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        expect(res.statusCode).toBe(HTTP_STATUS.OK);
        expect(data).toBe(expectedResponse);
        done();
      });
    });

    req.end();
  });

  it('should handle POST requests with body', (done) => {
    const testPath = '/test-post';
    const requestBody = { message: 'Hello, POST!' };
    const expectedResponse = JSON.stringify(requestBody);

    server.post(testPath, (req, res, body) => {
      res.writeHead(HTTP_STATUS.CREATED, {
        'Content-Type': 'application/json',
      });
      res.write(body);
      res.end();
    });

    const options = {
      hostname: 'localhost',
      port: port,
      path: testPath,
      method: HTTP_METHODS.POST,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        expect(res.statusCode).toBe(HTTP_STATUS.CREATED);
        expect(data).toBe(expectedResponse);
        done();
      });
    });

    req.write(JSON.stringify(requestBody));
    req.end();
  });

  it('should handle PATCH requests with body and params', (done) => {
    const testPath = '/test-patch/:id';
    const requestUrl = '/test-patch/123';
    const requestBody = { status: 'updated' };
    const expectedResponse = JSON.stringify(requestBody);

    server.patch(testPath, (req, res, body, params) => {
      expect(params.id).toBe(123);
      res.writeHead(HTTP_STATUS.OK, { 'Content-Type': 'application/json' });
      res.write(body);
      res.end();
    });

    const options = {
      hostname: 'localhost',
      port: port,
      path: requestUrl,
      method: HTTP_METHODS.PATCH,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        expect(res.statusCode).toBe(HTTP_STATUS.OK);
        expect(data).toBe(expectedResponse);
        done();
      });
    });

    req.write(JSON.stringify(requestBody));
    req.end();
  });

  it('should return 404 for unknown routes', (done) => {
    const testPath = '/non-existent-route';

    const options = {
      hostname: 'localhost',
      port: port,
      path: testPath,
      method: HTTP_METHODS.GET,
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
        expect(data).toBe('404 Not Found');
        done();
      });
    });

    req.end();
  });
});
