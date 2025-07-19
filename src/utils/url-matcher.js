/**
 * Utilitário para manipulação e verificação de URLs.
 */
class UrlMatcher {
  /**
   * Verifica se uma URL corresponde a um determinado caminho.
   * @param {string} path - O caminho da rota.
   * @param {string} url - A URL a ser verificada.
   * @return {boolean} - Retorna true se a URL corresponder ao caminho,
   * caso contrário, false.
   */
  static urlVerify(path, url) {
    const urlParts = url.split('/');
    const pathParts = path.split('/');
    if (urlParts.length === pathParts.length) {
      for (let i = 0; i < urlParts.length; i += 1) {
        if (!pathParts[i].startsWith(':')) {
          if (urlParts[i] !== pathParts[i]) {
            return false;
          }
        }
      }
    } else {
      return false;
    }
    return true;
  }

  /**
   * Extrai os parâmetros da URL com base no caminho da rota.
   * @param {string} path O caminho da rota com os parâmetros definidos como :param.
   * @param {string} url A URL a ser verificada.
   * @return {Object} Um objeto com os parâmetros da URL.
   */
  static extractParams(path, url) {
    const params = {};
    const urlParts = url.split('/');
    const pathParts = path.split('/');
    for (let i = 0; i < urlParts.length; i += 1) {
      if (pathParts[i].startsWith(':')) {
        const paramName = pathParts[i].substring(1);
        const paramValue = Number.isNaN(Number(urlParts[i]))
          ? urlParts[i]
          : Number(urlParts[i]);
        params[paramName] = paramValue;
      }
    }

    return params;
  }

  /**
   * Extrai os parâmetros da URL com base no objeto URLSearchParams.
   * @param {string} url A URL a ser verificada.
   * @return {Object} Um objeto com os parâmetros da URL.
   */
  static extractParamsFromURL(url) {
    const params = {};
    const urlParams = new URLSearchParams(url);
    urlParams.forEach((value, key) => {
      const realKey = key.includes('?') ? key.split('?').pop() : key;
      params[realKey] = Number.isNaN(Number(value)) ? value : Number(value);
    });
    return params;
  }
}

module.exports = UrlMatcher;
