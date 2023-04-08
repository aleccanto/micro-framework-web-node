const http = require("http");
const urlUtil = require('../util/url-util');
const apiUtil = require("../util/api-util");

class RestApi {
    constructor() {
        this.routes = {};
        this.supportedMethods = ["GET", "POST", "PATCH"];
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
     * @param {(req: http.IncomingMessage, res: http.ServerResponse, params?: Object) => void} callback - O callback que será chamado quando a rota for acessada.
     * @throws {Error} Se o URL ou callback forem inválidos.
     */
    get(url, callback) {
        this.addRoute("GET", url, callback);
    }

    /**
     * Adiciona uma rota HTTP POST à API.
     * @param {string} url - O URL da rota POST.
     * @param {(req: http.IncomingMessage, res: http.ServerResponse, body?: Object, params?: Object) => void} callback - O callback que será chamado quando a rota for acessada.
     * @throws {Error} Se o URL ou callback forem inválidos.
     */
    post(url, callback) {
        this.addRoute("POST", url, callback);
    }

    /**
     * Adiciona uma rota HTTP PATCH à API.
     * @param {string} url - O URL da rota PATCH.
     * @param {(req: http.IncomingMessage, res: http.ServerResponse, body?: Object, params?: Object) => void} callback - O callback que será chamado quando a rota for acessada.
     * @throws {Error} Se o URL ou callback forem inválidos.
     */
    patch(url, callback) {
        this.addRoute("PATCH", url, callback);
    }

    /**
     * Adiciona uma rota HTTP PUT à API.
     * @param {string} url - O URL da rota PUT.
     * @param {(req: http.IncomingMessage, res: http.ServerResponse, body?: Object, params?: Object) => void} callback - O callback que será chamado quando a rota for acessada.
     * @throws {Error} Se o URL ou callback forem inválidos.
     */
    put(url, callback) {
        this.addRoute("PUT", url, callback);
    }

    /**
     * Adiciona uma rota HTTP DELETE à API.
     * @param {string} url - O URL da rota DELETE.
     * @param {(req: http.IncomingMessage, res: http.ServerResponse, body?: Object, params?: Object) => void} callback - O callback que será chamado quando a rota for acessada.
     * @throws {Error} Se o URL ou callback forem inválidos.
     */
    delete(url, callback) {
        this.addRoute("DELETE", url, callback);
    }

    /**
     * @param {number} port - A porta em que a API deve ouvir por conexões.
     * @param {() => void} callback - Uma função a ser chamada quando a API começar a ouvir por conexões.
     */
    listen(port, callback) {
        const server = http.createServer((req, res) => {
            const method = req.method.toUpperCase();
            let params;
            const find = (/** @type {{ url: string; }} */ route) => {
                const result = urlUtil.urlVerify(route.url, req.url);
                if (result) {
                    params = urlUtil.extractParams(route.url, req.url)
                }
                return result;
            };
            const route = this.routes[method]?.find(find);
            if (route && route.callback) {
                apiUtil.readBody(req, body => {
                    route.callback(req, res, body, params);
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
}

module.exports = RestApi;
