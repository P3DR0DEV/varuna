import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { GetUserByEmailUseCase } from '../get-user-by-email'

let usersRepository: InMemoryUsersRepository
let sut: GetUserByEmailUseCase

describe('Find user by email use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserByEmailUseCase(usersRepository)

    const user = makeUser({
      email: 'any_email@example.com',
    })

    usersRepository.create(user)
  })

  it('should find a single user by his email', async () => {
    const result = await sut.execute({ email: 'any_email@example.com' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { user } = result.value

      expect(user.email).toEqual('any_email@example.com')
    }
  })

  it('should return a NotFoundError when email is invalid', async () => {
    const result = await sut.execute({ email: 'invalid_email' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError when email is empty', async () => {
    const result = await sut.execute({ email: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
