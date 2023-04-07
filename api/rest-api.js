const http = require("http");

class RestApi {
    constructor() {
        this.gets = [];
        this.posts = [];
    }

    /**
     * Adiciona uma rota HTTP GET à API.
     * @param {string} url - O URL da rota GET.
     * @param {(req: http.IncomingMessage, res: http.ServerResponse) => void} callback - O callback que será chamado quando a rota for acessada.
     * @throws {Error} Se o URL ou callback forem inválidos.
     */
    get(url, callback) {
        if (!url || typeof url !== 'string') {
            throw new Error('Invalid URL');
        }
        if (!callback || typeof callback !== 'function') {
            throw new Error('Invalid callback function');
        }
        this.gets.push({ url, callback });
    }

    /**
     * Adiciona uma rota HTTP POST à API.
     * @param {string} url - O URL da rota POST.
     * @param {(req: http.IncomingMessage, res: http.ServerResponse) => void} callback - O callback que será chamado quando a rota for acessada.
     * @throws {Error} Se o URL ou callback forem inválidos.
     */
    post(url, callback) {
        this.posts.push({ url, callback })
    }

    /**
     * @param {number} port - A porta em que a API deve ouvir por conexões.
     * @param {() => void} callback - Uma função a ser chamada quando a API começar a ouvir por conexões.
     */
    listen(port, callback) {
        const server = http.createServer((req, res) => {
            if (req.method === 'GET') {
                const get = this.gets.find(get => get.url === req.url);
                if (get && get.callback) {
                    get.callback(req, res);
                } else {
                    this._notFound(res);
                }
            } else if (req.method === 'POST') {

            }
        });
        server.listen(port, callback);
    }

    _notFound(res) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
}

module.exports = RestApi;