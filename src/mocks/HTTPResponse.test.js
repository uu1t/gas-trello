/* eslint-env jest */
import HTTPResponse, { okResponse } from './HTTPResponse'

describe('HTTPResponse', () => {
  const response = new HTTPResponse(200, 'OK')

  describe('.getResponseCode()', () => {
    it('returns response code', () => {
      expect(response.getResponseCode()).toBe(200)
    })
  })

  describe('.getContentText()', () => {
    it('returns content text', () => {
      expect(response.getContentText()).toBe('OK')
    })
  })
})

describe('okResponse', () => {
  describe('.getContentText()', () => {
    it('returns JSON-encoded text', () => {
      expect(() => {
        JSON.parse(okResponse.getContentText())
      }).not.toThrow()
    })
  })
})
