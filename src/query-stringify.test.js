/* eslint-env jest */
import queryStringify from './query-stringify'

describe('queryStringify()', () => {
  it('stringifies key-value pairs', () => {
    const obj = {
      k1: 'v1',
      k2: 'v2',
      k3: 'v3'
    }
    expect(queryStringify(obj)).toBe('k1=v1&k2=v2&k3=v3')
  })

  it('stringifies booleans', () => {
    const obj = {
      t: true,
      f: false
    }
    expect(queryStringify(obj)).toBe('t=true&f=false')
  })

  it('joins string[] with commas', () => {
    const obj = {
      fields: ['id', 'name', 'url']
    }
    expect(queryStringify(obj)).toBe('fields=id,name,url')
  })

  it("doesn't encode commas", () => {
    const obj = {
      fields: 'id,name,url'
    }
    expect(queryStringify(obj)).toBe('fields=id,name,url')
  })
})
