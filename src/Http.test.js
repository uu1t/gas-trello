/* eslint-env jest */
import Http from './Http'
import { okResponse, badRequestResponse } from './mocks/HTTPResponse'

describe('Http', () => {
  describe('.request()', () => {
    const http = new Http('key', 'token')

    beforeEach(() => {
      http._request = jest.fn()
    })

    it('calls ._request()', () => {
      const params = { k: 'v' }
      http.request('get', '/path/to/it', params)
      expect(http._request).toHaveBeenCalledWith('get', '/path/to/it', expect.objectContaining(params))
    })

    it('calls ._request() when params is omitted', () => {
      http.request('get', '/path/to/it')
      expect(http._request).toHaveBeenCalledWith('get', '/path/to/it', expect.any(Object))
    })

    it('passes params containing credentials to ._request()', () => {
      http.request('get', '/path/to/it', {})
      expect(http._request).toHaveBeenCalledWith('get', '/path/to/it', expect.objectContaining({ key: 'key', token: 'token' }))
    })

    it('extracts search params in pathname into params', () => {
      const params = { k3: 'v3', k4: 'v4' }
      const mergedParams = { k1: 'v1', k2: 'v2', ...params }
      http.request('get', '/path/to/it?k1=v1&k2=v2', params)
      expect(http._request).toHaveBeenCalledWith('get', '/path/to/it', expect.objectContaining(mergedParams))
    })
  })

  describe('._request()', () => {
    const http = new Http('key', 'token')
    const fetchMock = jest.fn().mockReturnValue(okResponse)
    global.UrlFetchApp = { fetch: fetchMock }

    it('calls UrlFetchApp.fetch()', () => {
      http._request('get', '/path/to/it', {})
      expect(fetchMock).toBeCalled()
    })

    describe('on success', () => {
      it('returns response data', () => {
        expect(http._request('get', '/path/to/it', {})).toEqual(JSON.parse(okResponse.content))
      })
    })

    describe('on error', () => {
      it('throws error', () => {
        fetchMock.mockReturnValueOnce(badRequestResponse)
        expect(() => {
          http._request('get', '/path/to/it', {})
        }).toThrow(expect.any(Error))
      })
    })
  })
})
