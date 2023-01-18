export class CompetitionError extends Error {
  public status;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class NotFoundError extends CompetitionError {
  constructor(message: string) {
    const statusCode = 404;
    super(message, statusCode);
  }
}

export class Unauthorized extends CompetitionError {
  constructor(message: string) {
    const statusCode = 401;
    super(message, statusCode);
  }
}

export class Forbidden extends CompetitionError {
  constructor(message: string) {
    const statusCode = 403;
    super(message, statusCode);
  }
}

export class Unexpected extends CompetitionError {
  constructor(message: string) {
    const statusCode = 500;
    super(message, statusCode);
  }
}
