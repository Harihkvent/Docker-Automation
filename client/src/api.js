const rawApiUrl = process.env.REACT_APP_API_URL || '';

// When the page is served over HTTPS, ensure the API URL also uses HTTPS
// to prevent mixed content errors blocked by the browser.
// Also strips the port since nginx handles HTTPS on 443 and proxies internally.
function getApiUrl(url) {
  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'https:' &&
    url.startsWith('http://')
  ) {
    return url.replace('http://', 'https://').replace(/:\d+$/, '');
  }
  return url;
}

const API_URL = getApiUrl(rawApiUrl);

export default API_URL;
