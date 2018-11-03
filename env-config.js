const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'process.env.API_URL': prod ? 'http://192.168.50.3:2220/api/' : 'http://127.0.0.1:9000/api/'
}
