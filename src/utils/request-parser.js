/* eslint-disable valid-jsdoc */

/**
 * Utilitário para parsear requisições HTTP.
 */
class RequestParser {
  /**
   * Lê o corpo de uma requisição HTTP.
   *
   * @param {import('http').IncomingMessage} req - O objeto de requisição HTTP.
   * @param {(body: string) => void} callback - O callback a ser chamado com o corpo da requisição.
   * @return {void}
   */
  static readBody(req, callback) {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      callback(body);
    });
  }
}

module.exports = RequestParser;
