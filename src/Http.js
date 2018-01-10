import queryStringify from './query-stringify'

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

  request (method, pathname, paramsOrCallback = {}, callback = () => undefined) {
    let params = {}
    if (typeof paramsOrCallback === 'function') {
      callback = paramsOrCallback
    } else {
      params = paramsOrCallback
    }
    this._request(method, pathname, params, callback)
  }

  _request (method, pathname, params, callback) {
    let url = this.origin + pathname
    const options = {
      method,
      contentType: 'application/json',
      muteHttpExceptions: true
    }

    if (method === 'get' || method === 'delete') {
      url += '?' + queryStringify(this.addCredentials(params))
    } else {
      options.payload = JSON.stringify(this.addCredentials(params))
    }

    const res = UrlFetchApp.fetch(url, options)
    const statusCode = res.getResponseCode()
    const body = res.getContentText()

    if (statusCode >= 400) {
      const err = requestError(statusCode, body, { url, method: method.toUpperCase() })
      callback(err)
    } else {
      callback(null, JSON.parse(body))
    }
  }

  addCredentials (params) {
    params.key = this.key
    if (this.token) {
      params.token = this.token
    }
    return params
  }
}
