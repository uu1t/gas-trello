var global=this;function Http() {
}(function () {
'use strict';

function encode(obj) {
  // join string[] with commas
  if (Array.isArray(obj)) {
    return obj.map(function (value) {
      return encodeURIComponent(value);
    }).join(',');
  }

  // don't encode commas
  if (typeof obj === 'string' && obj.indexOf(',') !== -1) {
    return obj.split(',').map(function (value) {
      return encodeURIComponent(value);
    }).join(',');
  }

  return encodeURIComponent(obj);
}

function queryStringify(params) {
  return Object.keys(params).map(function (key) {
    return key + '=' + encode(params[key]);
  }).join('&');
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function requestError(statusCode, body, request) {
  var message = request.method + ' ' + request.url + ' returned ' + statusCode + ': ' + body;
  var err = new Error(message);
  err.statusCode = statusCode;
  err.body = body;
  err.request = request;
  return err;
}

var Http = function () {
  function Http(key, token) {
    classCallCheck(this, Http);

    if (!key) {
      throw new Error('Application API key is required');
    }
    this.key = key;
    this.token = token;
    this.origin = 'https://api.trello.com';

    this.get = this.request.bind(this, 'get');
    this.post = this.request.bind(this, 'post');
    this.put = this.request.bind(this, 'put');
    this.del = this.request.bind(this, 'delete');
  }

  createClass(Http, [{
    key: 'request',
    value: function request(method, pathname) {
      var paramsOrCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {
        return undefined;
      };

      var params = {};
      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
      } else {
        params = paramsOrCallback;
      }
      this._request(method, pathname, params, callback);
    }
  }, {
    key: '_request',
    value: function _request(method, pathname, params, callback) {
      var url = this.origin + pathname;
      var options = {
        method: method,
        contentType: 'application/json',
        muteHttpExceptions: true
      };

      if (method === 'get' || method === 'delete') {
        url += '?' + queryStringify(this.addCredentials(params));
      } else {
        options.payload = JSON.stringify(this.addCredentials(params));
      }

      var res = UrlFetchApp.fetch(url, options);
      var statusCode = res.getResponseCode();
      var body = res.getContentText();

      if (statusCode >= 400) {
        var err = requestError(statusCode, body, { url: url, method: method.toUpperCase() });
        callback(err);
      } else {
        callback(null, JSON.parse(body));
      }
    }
  }, {
    key: 'addCredentials',
    value: function addCredentials(params) {
      params.key = this.key;
      if (this.token) {
        params.token = this.token;
      }
      return params;
    }
  }]);
  return Http;
}();

global.Http = Http;

}());
