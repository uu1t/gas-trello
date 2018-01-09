function encode (obj) {
  // join string[] with commas
  if (Array.isArray(obj)) {
    return obj.map(value => encodeURIComponent(value)).join(',')
  }

  // don't encode commas
  if (typeof obj === 'string' && obj.indexOf(',') !== -1) {
    return obj.split(',').map(value => encodeURIComponent(value)).join(',')
  }

  return encodeURIComponent(obj)
}

export default function queryStringify (params) {
  return Object.keys(params).map(key => {
    return key + '=' + encode(params[key])
  }).join('&')
}
