const RequestParser = require('../../src/utils/request-parser');

describe('RequestParser', () => {
  describe('readBody', () => {
    it('should read the request body correctly', (done) => {
      const mockReq = {
        on: jest.fn((event, callback) => {
          if (event === 'data') {
            callback('chunk1');
            callback('chunk2');
          } else if (event === 'end') {
            callback();
          }
        }),
      };

      RequestParser.readBody(mockReq, (body) => {
        expect(body).toBe('chunk1chunk2');
        expect(mockReq.on).toHaveBeenCalledWith('data', expect.any(Function));
        expect(mockReq.on).toHaveBeenCalledWith('end', expect.any(Function));
        done();
      });
    });

    it('should handle empty body correctly', (done) => {
      const mockReq = {
        on: jest.fn((event, callback) => {
          if (event === 'end') {
            callback();
          }
        }),
      };

      RequestParser.readBody(mockReq, (body) => {
        expect(body).toBe('');
        expect(mockReq.on).toHaveBeenCalledWith('data', expect.any(Function));
        expect(mockReq.on).toHaveBeenCalledWith('end', expect.any(Function));
        done();
      });
    });
  });
});
