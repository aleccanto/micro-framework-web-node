/* eslint-disable valid-jsdoc */

const http = require('http');
const UrlMatcher = require('../utils/url-matcher');
const RequestParser = require('../utils/request-parser');
const HTTP_STATUS = require('../utils/http-status');
const HTTP_METHODS = require('../utils/http-methods');

/**
 * Representa o servidor principal da aplicação.
 */
class Server {
  /**
   * Cria uma instância do servidor.
   * @constructor
   */
  constructor() {
    this.routes = {};
    this.supportedMethods = Object.values(HTTP_METHODS);
  }

  /**
   * Adiciona uma rota HTTP à API.
   *
   * @param {string} method O método HTTP para adicionar (ex: "GET" ou "POST").
   * @param {string} url O URL da rota a ser adicionada.
   * @param {(req: http.IncomingMessage, res: http.ServerResponse) => void} callback O callback que será chamado quando a rota for acessada.
   * @throws {Error} Se o método, URL ou callback forem inválidos.
   * @returns {void}
   */
  addRoute(method, url, callback) {
    if (!method || !this.supportedMethods.includes(HTTP_METHODS[method])) {
      throw new Error(`Invalid HTTP method: ${method}`);
    }
    if (!url || typeof url !== 'string') {
      throw new Error('Invalid URL');
    }
    if (!callback || typeof callback !== 'function') {
      throw new Error('Invalid callback function');
    }
    if (!this.routes[method]) {
      this.routes[method] = [];
    }
    this.routes[method].push({ url, callback });
  }

  /**
   * Adiciona uma rota HTTP GET à API.
   *
   * @param {string} url - O URL da rota GET.
   * @param {(req: http.IncomingMessage, res: http.ServerResponse, params?: Object) => void} callback - O callback que será chamado quando a rota for acessada.
   * @throws {Error} Se o URL ou callback forem inválidos.
   * @returns {void}
   */
  get(url, callback) {
    this.addRoute(HTTP_METHODS.GET, url, callback);
  }

  /**
   * Adiciona uma rota HTTP POST à API.
   *
   * @param {string} url - O URL da rota POST.
   * @param {(req: http.IncomingMessage, res: http.ServerResponse, body?: Object, params?: Object) => void} callback - O callback que será chamado quando a rota for acessada.
   * @throws {Error} Se o URL ou callback forem inválidos.
   * @returns {void}
   */
  post(url, callback) {
    this.addRoute(HTTP_METHODS.POST, url, callback);
  }

  /**
   * Adiciona uma rota HTTP PATCH à API.
   *
   * @param {string} url - O URL da rota PATCH.
   * @param {(req: http.IncomingMessage, res: http.ServerResponse, body?: Object, params?: Object) => void} callback - O callback que será chamado quando a rota for acessada.
   * @throws {Error} Se o URL ou callback forem inválidos.
   * @returns {void}
   */
  patch(url, callback) {
    this.addRoute(HTTP_METHODS.PATCH, url, callback);
  }

  /**
   * Adiciona uma rota HTTP PUT à API.
   *
   * @param {string} url - O URL da rota PUT.
   * @param {(req: http.IncomingMessage, res: http.ServerResponse, body?: Object, params?: Object) => void} callback - O callback que será chamado quando a rota for acessada.
   * @throws {Error} Se o URL ou callback forem inválidos.
   * @returns {void}
   */
  put(url, callback) {
    this.addRoute(HTTP_METHODS.PUT, url, callback);
  }

  /**
   * Adiciona uma rota HTTP DELETE à API.
   *
   * @param {string} url - O URL da rota DELETE.
   * @param {(req: http.IncomingMessage, res: http.ServerResponse, body?: Object, params?: Object) => void} callback - O callback que será chamado quando a rota for acessada.
   * @throws {Error} Se o URL ou callback forem inválidos.
   * @returns {void}
   */
  delete(url, callback) {
    this.addRoute(HTTP_METHODS.DELETE, url, callback);
  }

  /**
   * Inicia o servidor HTTP e começa a ouvir por conexões.
   *
   * @param {number} port - A porta em que a API deve ouvir por conexões.
   * @param {() => void} callback - Uma função a ser chamada quando a API começar a ouvir por conexões.
   * @return {void}
   */
  listen(port, callback) {
    this.httpServer = http.createServer((req, res) => {
      const method = req.method.toUpperCase();
      let params;
      const find = (/** @type {{ url: string; }} */ route) => {
        const result = UrlMatcher.urlVerify(route.url, req.url);
        if (result) {
          params = UrlMatcher.extractParams(route.url, req.url);
        }
        return result;
      };
      const route = this.routes[method]?.find(find);
      if (route?.callback) {
        if (HTTP_METHODS[method]) {
          try {
            RequestParser.readBody(req, (body) => {
              route.callback(req, res, body, params);
            });
          } catch (ex) {
            console.log(ex);
          }
        } else {
          route.callback(req, res, null, params);
        }
      } else {
        Server.notFound(res);
      }
    });
    this.httpServer.listen(port, callback);
  }

  /**
   * Fecha o servidor HTTP.
   *
   * @param {(err?: Error) => void} [callback] - Um callback opcional a ser chamado quando o servidor for fechado.
   * @returns {void}
   */
  close(callback) {
    if (this.httpServer) {
      this.httpServer.close(callback);
    }
  }

  /**
   * @param {http.ServerResponse} res - O objeto de resposta HTTP.
   *
   * @return {void}
   */
  static notFound(res) {
    res.writeHead(HTTP_STATUS.NOT_FOUND, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
}

module.exports = Server;
