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

var Http = function () {
  function Http(key, token) {
    classCallCheck(this, Http);

    if (!key) {
      throw new Error('Application API key is required');
    }
    this.key = key;
    this.token = token;
    this.origin = 'https://api.trello.com';
  }

  createClass(Http, [{
    key: 'get',
    value: function get$$1(pathname, args) {
      return this.request('get', pathname, args);
    }
  }, {
    key: 'post',
    value: function post(pathname, args) {
      return this.request('post', pathname, args);
    }
  }, {
    key: 'put',
    value: function put(pathname, args) {
      return this.request('put', pathname, args);
    }
  }, {
    key: 'del',
    value: function del(pathname, args) {
      return this.request('delete', pathname, args);
    }
  }, {
    key: 'request',
    value: function request(method, pathname) {
      var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var url = this.origin + pathname;
      var params = {
        method: method
      };

      if (method === 'get' || method === 'delete') {
        url += '?' + queryStringify(this.addCredentials(args));
      } else {
        params.contentType = 'application/json';
        params.payload = JSON.stringify(this.addCredentials(args));
      }

      return UrlFetchApp.fetch(url, params);
    }
  }, {
    key: 'addCredentials',
    value: function addCredentials(args) {
      args.key = this.key;
      if (this.token) {
        args.token = this.token;
      }
      return args;
    }
  }]);
  return Http;
}();

global.Http = Http;

}());
