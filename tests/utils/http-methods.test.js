const HTTP_METHODS = require('../../src/utils/http-methods');

describe('HTTP_METHODS', () => {
  it('should contain the correct HTTP methods', () => {
    expect(HTTP_METHODS).toEqual({
      GET: 'GET',
      POST: 'POST',
      PUT: 'PUT',
      PATCH: 'PATCH',
      DELETE: 'DELETE',
    });
  });

  it('should be frozen (immutable)', () => {
    expect(Object.isFrozen(HTTP_METHODS)).toBe(true);
  });
});
