class NotFoundError extends Error {
  public statusCode: number

  constructor(message: string) {
    super()
    this.message = message || 'Not found.'
    this.statusCode = 404
  }
}

class Unexpected extends Error {
  public statusCode: number

  constructor(message: string) {
    super()
    this.message = message || 'Unexpected error.'
    this.statusCode = 500
  }
}

class Unauthorized extends Error {
  public statusCode: number

  constructor(message: string) {
    super()
    this.message = message || 'Unauthorized.'
    this.statusCode = 401
  }
}

export default { NotFoundError, Unexpected, Unauthorized }
