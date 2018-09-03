'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.11.46/"',
  WEBSOCKET_URL: '"ws://192.168.11.198:8012/webSocket"'
})
