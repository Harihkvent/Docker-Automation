describe('api.js - getApiUrl', () => {
  const originalWindow = global.window;

  afterEach(() => {
    jest.resetModules();
    delete process.env.REACT_APP_API_URL;
    global.window = originalWindow;
  });

  test('upgrades http to https when page is served over HTTPS', () => {
    delete global.window;
    global.window = { location: { protocol: 'https:' } };
    process.env.REACT_APP_API_URL = 'http://52.66.195.34:5000';
    const API_URL = require('./api').default;
    expect(API_URL).toBe('https://52.66.195.34:5000');
  });

  test('does not modify https URL when page is served over HTTPS', () => {
    delete global.window;
    global.window = { location: { protocol: 'https:' } };
    process.env.REACT_APP_API_URL = 'https://my-backend.railway.app';
    const API_URL = require('./api').default;
    expect(API_URL).toBe('https://my-backend.railway.app');
  });

  test('does not modify http URL when page is served over HTTP (dev)', () => {
    delete global.window;
    global.window = { location: { protocol: 'http:' } };
    process.env.REACT_APP_API_URL = 'http://localhost:5000';
    const API_URL = require('./api').default;
    expect(API_URL).toBe('http://localhost:5000');
  });

  test('returns empty string when REACT_APP_API_URL is not set', () => {
    delete global.window;
    global.window = { location: { protocol: 'https:' } };
    delete process.env.REACT_APP_API_URL;
    const API_URL = require('./api').default;
    expect(API_URL).toBe('');
  });
});
