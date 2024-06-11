import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { FetchAllUserUseCase } from '../fetch-all-users'

let usersRepository: InMemoryUsersRepository
let sut: FetchAllUserUseCase

describe('Find all users use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchAllUserUseCase(usersRepository)

    for (let i = 0; i < 5; i++) {
      const user = makeUser()

      usersRepository.create(user)
    }
  })

  it('should find all users', async () => {
    const result = await sut.execute()
    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { users } = result.value

      expect(users).toHaveLength(5)
    }
  })
})
