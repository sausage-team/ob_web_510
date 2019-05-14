module.exports = {
  '/api': {
    'target': 'http://192.168.2.103:8000',
    // 'target': 'http://192.168.1.93:8081',
    // 'target': 'http://192.168.0.46:8081',
    'changeOrigin': true
  },
  '/files': {
    'target': 'http://192.168.2.103:8088',
    // 'target': 'http://192.168.1.93:8081',
    // 'target': 'http://192.168.0.46:8081',
    'changeOrigin': true
  }
}
