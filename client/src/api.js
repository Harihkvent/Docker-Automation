const rawApiUrl = process.env.REACT_APP_API_URL || '';

// When the page is served over HTTPS, ensure the API URL also uses HTTPS
// to prevent mixed content errors blocked by the browser.
// Also strips the port since nginx handles HTTPS on 443 and proxies internally.
function getApiUrl(url) {
  if (typeof window === 'undefined' || window.location.protocol !== 'https:') {
    return url;
  }

  let result = url;

  // Add https:// if no protocol is specified
  if (result && !result.startsWith('http://') && !result.startsWith('https://')) {
    result = 'https://' + result;
  }

  // Upgrade http to https
  if (result.startsWith('http://')) {
    result = result.replace('http://', 'https://');
  }

  // Strip port number (e.g. :5000) since nginx handles HTTPS on 443
  result = result.replace(/(https:\/\/[^/:]+):\d+(\/|$)/, '$1$2');

  return result;
}

const API_URL = getApiUrl(rawApiUrl);

export default API_URL;
