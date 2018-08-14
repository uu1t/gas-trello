var endpoint_ = 'https://api.trello.com/1/';
var key_ = '';
var token_ = '';

/**
 * Set Trello API key.
 * @param {string} key Trello API key
 */
function setKey(key) {
  key_ = key;
}

/**
 * Set Trello API token.
 * @param {string} token Trello API token
 */
function setToken(token) {
  token_ = token;
}

/**
 * Send GET request.
 * @param {string} path
 * @param {{ [key: string]: string }} [params]
 * @return {any}
 */
function get(path, params) {
  return rest('GET', path, params);
}

/**
 * Send POST request.
 * @param {string} path
 * @param {{ [key: string]: string }} [params]
 * @return {any}
 */
function post(path, params) {
  return rest('POST', path, params);
}

/**
 * Send PUT request.
 * @param {string} path
 * @param {{ [key: string]: string }} [params]
 * @return {any}
 */
function put(path, params) {
  return rest('PUT', path, params);
}

/**
 * Send DELETE request.
 * @param {string} path
 * @param {{ [key: string]: string }} [params]
 * @return {any}
 */
function del(path, params) {
  return rest('DELETE', path, params);
}

/**
 * Send REST request.
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} method HTTP method to use when making the request to the Trello API
 * @param {string} path API path to use, such as "members/me"
 * @param {{ [key: string]: string }} [params={}] Query parameters to the API path, such as { fields: "username,fullName" }
 * @return {any} Result object
 */
function rest(method, path, params) {
  params = params || {};
  params.key = params.key || key_;
  params.token = params.token || token_;

  if (!params.key) {
    throw new Error('Trello API key is required');
  }
  if (!params.token) {
    throw new Error('Trello API token is required');
  }

  // Get rid of any leading /
  path = path.replace(/^\/*/, '');

  var url = endpoint_ + path + toQuery_(params);
  var response = UrlFetchApp.fetch(url, {
    method: method,
    contentType: 'application/json'
  });
  return JSON.parse(response.getContentText());
}

/**
 * @param {{ [key: string]: string }} params
 * @return {string}
 */
function toQuery_(params) {
  return (
    '?' +
    Object.keys(params)
      .map(function(key) {
        return key + '=' + encodeURIComponent(params[key]);
      })
      .join('&')
  );
}
