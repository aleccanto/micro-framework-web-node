const http = require("http");

class RestApi {
    constructor() {
        this.routes = {};
        this.supportedMethods = ["GET", "POST"];
    }

    /**
     * Adiciona uma rota HTTP à API.
     * @param {string} method - O método HTTP para adicionar (ex: "GET" ou "POST").
     * @param {string} url - O URL da rota a ser adicionada.
     * @param {(req: http.IncomingMessage, res: http.ServerResponse) => void} callback - O callback que será chamado quando a rota for acessada.
     * @throws {Error} Se o método, URL ou callback forem inválidos.
     */
    addRoute(method, url, callback) {
        if (!method || !this.supportedMethods.includes(method.toUpperCase())) {
            throw new Error(`Invalid HTTP method: ${method}`);
        }
        if (!url || typeof url !== "string") {
            throw new Error("Invalid URL");
        }
        if (!callback || typeof callback !== "function") {
            throw new Error("Invalid callback function");
        }

        if (!this.routes[method]) {
            this.routes[method] = [];
        }
        this.routes[method].push({ url, callback });
    }

    /**
     * Adiciona uma rota HTTP GET à API.
     * @param {string} url - O URL da rota GET.
     * @param {(req: http.IncomingMessage, res: http.ServerResponse) => void} callback - O callback que será chamado quando a rota for acessada.
     * @throws {Error} Se o URL ou callback forem inválidos.
     */
    get(url, callback) {
        this.addRoute("GET", url, callback);
    }

    /**
     * Adiciona uma rota HTTP POST à API.
     * @param {string} url - O URL da rota POST.
     * @param {(req: http.IncomingMessage, res: http.ServerResponse, body?: Object) => void} callback - O callback que será chamado quando a rota for acessada.
     * @throws {Error} Se o URL ou callback forem inválidos.
     */
    post(url, callback) {
        this.addRoute("POST", url, callback);
    }

    /**
     * @param {number} port - A porta em que a API deve ouvir por conexões.
     * @param {() => void} callback - Uma função a ser chamada quando a API começar a ouvir por conexões.
     */
    listen(port, callback) {
        const server = http.createServer((req, res) => {
            const method = req.method.toUpperCase();
            const route = this.routes[method]?.find((/** @type {{ url: string; }} */ route) => route.url === req.url);
            if (route && route.callback) {
                this._readBody(req, body => {
                    route.callback(req, res, body);
                })
            } else {
                this._notFound(res);
            }
        });
        server.listen(port, callback);
    }

    /**
     * @param {http.ServerResponse} res
     */
    _notFound(res) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }

    /**
     * @param {http.IncomingMessage} req
     * @param {(body: string) => void} callback
     */
    _readBody(req, callback) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            callback(body);
        });
    }
}

module.exports = RestApi;
