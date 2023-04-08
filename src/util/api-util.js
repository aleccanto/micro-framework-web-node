const { IncomingMessage } = require('http');

class ApiUtil {
    /**
     * @param {IncomingMessage} req
     * @param {(body: string) => void} callback
     */
    readBody(req, callback) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            callback(body);
        });
    }
}

const apiUtil = new ApiUtil();
module.exports = apiUtil;