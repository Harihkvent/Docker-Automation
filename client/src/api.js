const rawApiUrl = process.env.REACT_APP_API_URL || '';

// When the page is served over HTTPS, ensure the API URL also uses HTTPS
// to prevent mixed content errors blocked by the browser.
function getApiUrl(url) {
  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'https:' &&
    url.startsWith('http://')
  ) {
    return url.replace('http://', 'https://');
  }
  return url;
}

const API_URL = getApiUrl(rawApiUrl);

export default API_URL;
