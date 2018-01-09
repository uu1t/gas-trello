import queryStringify from './query-stringify'

export default class Http {
  constructor (key, token) {
    if (!key) {
      throw new Error('Application API key is required')
    }
    this.key = key
    this.token = token
    this.origin = 'https://api.trello.com'
  }

  get (pathname, args) {
    return this.request('get', pathname, args)
  }

  post (pathname, args) {
    return this.request('post', pathname, args)
  }

  put (pathname, args) {
    return this.request('put', pathname, args)
  }

  del (pathname, args) {
    return this.request('delete', pathname, args)
  }

  request (method, pathname, args = {}) {
    let url = this.origin + pathname
    const params = {
      method
    }

    if (method === 'get' || method === 'delete') {
      url += '?' + queryStringify(this.addCredentials(args))
    } else {
      params.contentType = 'application/json'
      params.payload = JSON.stringify(this.addCredentials(args))
    }

    return UrlFetchApp.fetch(url, params)
  }

  addCredentials (args) {
    args.key = this.key
    if (this.token) {
      args.token = this.token
    }
    return args
  }
}
