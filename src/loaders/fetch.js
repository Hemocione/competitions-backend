const fetch = require('node-fetch')

const loader = () => {
  if (!globalThis.fetch) {
    globalThis.fetch = fetch
  }
}

module.exports = loader
