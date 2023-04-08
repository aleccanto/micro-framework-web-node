class UrlUtil {

    /**
     * @param {string} path
     * @param {string} url
     */
    urlVerify(path, url) {
        const urlParts = url.split('/');
        const pathParts = path.split('/');
        if (urlParts.length === pathParts.length) {
            for (let i = 0; i < urlParts.length; i++) {
                if (pathParts[i].startsWith(":")) continue;
                if (urlParts[i] !== pathParts[i]) {
                    return false;
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
     * @returns {Object} Um objeto com os parâmetros da URL.
     */
    extractParams(path, url) {
        const params = {};
        const urlParts = url.split('/');
        const pathParts = path.split('/');
        for (let i = 0; i < urlParts.length; i++) {
            if (pathParts[i].startsWith(":")) {
                const paramName = pathParts[i].substring(1);
                const paramValue = isNaN(Number(urlParts[i])) ? urlParts[i] : Number(urlParts[i])
                params[paramName] = paramValue;
            };
        }
        // const urlParamns = this.extractParamsFromURL(url);

        // Object.assign(params, urlParamns);

        return params;
    }

    /**
     * Extrai os parâmetros da URL com base no objeto URLSearchParams.
     * @param {string} url A URL a ser verificada.
     * @returns {Object} Um objeto com os parâmetros da URL.
     */
    extractParamsFromURL(url) {
        const params = {};
        const urlParams = new URLSearchParams(url);
        urlParams.forEach((value, key) => {
            const realKey = key.includes('?') ? key.split('?').pop() : key;
            params[realKey] = isNaN(Number(value)) ? value : Number(value);
        })
        return params;

    }
}

const urlUtil = new UrlUtil();
module.exports = urlUtil;