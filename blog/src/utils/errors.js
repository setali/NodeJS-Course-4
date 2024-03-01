export class BadRequestError extends Error {
  status = 400

  constructor (message = 'Bad Request') {
    super(message)
  }
}

export class UnAuthorizedError extends Error {
  status = 401

  constructor (message = 'UnAuthorized') {
    super(message)
  }
}

export class ForbiddenError extends Error {
  status = 403

  constructor (message = 'Forbidden') {
    super(message)
  }
}

export class NotFoundError extends Error {
  status = 404

  constructor (message = 'NotFound') {
    super(message)
  }
}
