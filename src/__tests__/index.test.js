const querystring = require('querystring');

class HTTPResponse {
  constructor(resultObject) {
    this.resultObject = resultObject;
  }

  getContentText() {
    return JSON.stringify(this.resultObject);
  }
}

const okResponse = new HTTPResponse({ message: 'OK' });

beforeEach(() => {
  key_ = 'KEY';
  token_ = 'TOKEN';
  global.UrlFetchApp = { fetch: jest.fn() };
  UrlFetchApp.fetch.mockReturnValue(okResponse);
});

describe('rest()', () => {
  it('calls UrlFetchApp.fetch()', () => {
    rest('GET', 'path/to/it');
    expect(UrlFetchApp.fetch).toHaveBeenCalled();
  });

  it('builds query from params', () => {
    rest('GET', 'path/to/it', { k1: 'v1', k2: 'v2' });
    const [path, query] = UrlFetchApp.fetch.mock.calls[0][0].split('?');
    expect(path).toBe('https://api.trello.com/1/path/to/it');
    expect(querystring.parse(query)).toEqual({
      key: 'KEY',
      token: 'TOKEN',
      k1: 'v1',
      k2: 'v2'
    });
  });

  it('deletes leaing / in path', () => {
    rest('GET', '/path/to/it');
    const path = UrlFetchApp.fetch.mock.calls[0][0].split('?')[0];
    expect(path).toBe('https://api.trello.com/1/path/to/it');
  });

  it('throws error when key or token is not set', () => {
    key_ = '';
    token_ = '';

    expect(() => {
      rest('GET', '');
    }).toThrow('key');

    expect(() => {
      rest('GET', '', { key: 'KEY' });
    }).toThrow('token');

    expect(() => {
      rest('GET', '', { key: 'KEY', token: 'TOKEN' });
    }).not.toThrow();
  });
});
