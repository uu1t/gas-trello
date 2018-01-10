export default class HTTPResponse {
  constructor (responseCode, content) {
    this.responseCode = responseCode
    this.content = content
  }

  getResponseCode () {
    return this.responseCode
  }

  getContentText () {
    return this.content
  }
}

const okResponse = new HTTPResponse(200, JSON.stringify({ message: 'OK' }))
const badRequestResponse = new HTTPResponse(400, 'Bad Request')

export { okResponse, badRequestResponse }
