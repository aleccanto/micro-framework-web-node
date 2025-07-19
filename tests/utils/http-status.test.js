const HTTP_STATUS = require('../../src/utils/http-status');

describe('HTTP_STATUS', () => {
  it('should contain the correct HTTP status codes', () => {
    expect(HTTP_STATUS).toEqual({
      OK: 200,
      CREATED: 201,
      NO_CONTENT: 204,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      INTERNAL_SERVER_ERROR: 500,
    });
  });

  it('should be frozen (immutable)', () => {
    expect(Object.isFrozen(HTTP_STATUS)).toBe(true);
  });
});
