
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./use-idb-keyval.cjs.production.min.js')
} else {
  module.exports = require('./use-idb-keyval.cjs.development.js')
}
