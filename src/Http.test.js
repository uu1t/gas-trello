/* eslint-env jest */
import Http from './Http'
import { okResponse, badRequestResponse } from './mocks/HTTPResponse'

describe('Http', () => {
  describe('.request()', () => {
    const http = new Http('key', 'token')
    const cb = (_, data) => data

    beforeEach(() => {
      http._request = jest.fn()
    })

    it('calls ._request()', () => {
      const params = { k: 'v' }
      http.request('get', '/path/to/it', params, cb)
      expect(http._request).toHaveBeenCalledWith('get', '/path/to/it', params, cb)
    })

    it('calls ._request() when params is omitted', () => {
      http.request('get', '/path/to/it', cb)
      expect(http._request).toHaveBeenCalledWith('get', '/path/to/it', {}, cb)
    })
  })

  describe('._request()', () => {
    const http = new Http('key', 'token')
    const fetchMock = jest.fn().mockReturnValue(okResponse)
    global.UrlFetchApp = { fetch: fetchMock }

    it('calls UrlFetchApp.fetch()', () => {
      http._request('get', '/path/to/it', {}, () => undefined)
      expect(fetchMock).toBeCalled()
    })

    describe('on success', () => {
      it('calls callback with response data', () => {
        const cbMock = jest.fn()
        http._request('get', '/path/to/it', {}, cbMock)
        expect(cbMock).toHaveBeenCalledWith(null, expect.any(Object))
      })
    })

    describe('on error', () => {
      it('calls callbcak with error', () => {
        fetchMock.mockReturnValueOnce(badRequestResponse)
        const cbMock = jest.fn()
        http._request('get', '/path/to/it', {}, cbMock)
        expect(cbMock).toHaveBeenCalledWith(expect.any(Error))
      })
    })
  })
})
