class Left<F, S> {
  readonly reason: F

  constructor(reason: F) {
    this.reason = reason
  }

  isFailure(): this is Left<F, S> {
    return true
  }

  isSuccess(): this is Right<F, S> {
    return false
  }
}

class Right<F, S> {
  readonly value: S

  constructor(value: S) {
    this.value = value
  }

  isFailure(): this is Left<F, S> {
    return false
  }

  isSuccess(): this is Right<F, S> {
    return true
  }
}

export type Either<F, S> = Left<F, S> | Right<F, S>

export const failure = <F, S>(error: F): Either<F, S> => new Left(error)
export const success = <F, S>(value: S): Either<F, S> => new Right(value)
