import 'es6-object-assign/auto'
import querystring from 'querystring'

function requestError (statusCode, body, request) {
  const message = `${request.method} ${request.url} returned ${statusCode}: ${body}`
  const err = new Error(message)
  err.statusCode = statusCode
  err.body = body
  err.request = request
  return err
}

export default class Http {
  constructor (key, token) {
    if (!key) {
      throw new Error('Application API key is required')
    }
    this.key = key
    this.token = token
    this.origin = 'https://api.trello.com'

    this.get = this.request.bind(this, 'get')
    this.post = this.request.bind(this, 'post')
    this.put = this.request.bind(this, 'put')
    this.del = this.request.bind(this, 'delete')
  }

  get credentials () {
    return {
      key: this.key,
      token: this.token
    }
  }

  request (method, pathname, params = {}) {
    params = Object.assign(params, this.credentials)

    // extract search params in pathname into params
    if (typeof pathname === 'string' && pathname.indexOf('?') !== -1) {
      let search
      [pathname, search] = pathname.split('?')
      params = Object.assign(params, querystring.parse(search))
    }
    return this._request(method, pathname, params)
  }

  _request (method, pathname, params) {
    let url = this.origin + pathname
    const options = {
      method,
      contentType: 'application/json',
      muteHttpExceptions: true
    }

    if (method === 'get' || method === 'delete') {
      url += '?' + querystring.stringify(params)
    } else {
      options.payload = JSON.stringify(params)
    }

    const res = UrlFetchApp.fetch(url, options)
    const statusCode = res.getResponseCode()
    const body = res.getContentText()

    if (statusCode >= 400) {
      throw requestError(statusCode, body, { url, method: method.toUpperCase() })
    }
    return JSON.parse(body)
  }
}
