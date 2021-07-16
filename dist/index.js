
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./useidbkeyval.cjs.production.min.js')
} else {
  module.exports = require('./useidbkeyval.cjs.development.js')
}
