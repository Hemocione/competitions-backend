class NotFoundError extends Error {
  constructor(message) {
    super()
    this.message = message || 'Not found.'
    this.statusCode = 404
  }
}

module.exports = NotFoundError
