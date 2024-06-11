import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { GetUserByBadgeUseCase } from '../get-user-by-badge'

let usersRepository: InMemoryUsersRepository
let sut: GetUserByBadgeUseCase

describe('Find by badge use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserByBadgeUseCase(usersRepository)

    const user = makeUser({
      badge: '123456',
    })

    usersRepository.create(user)
  })

  it('should find a user by badge', async () => {
    const result = await sut.execute({ badge: '123456' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { user } = result.value

      expect(user).toEqual(
        expect.objectContaining({
          badge: '123456',
          id: user.id,
          name: user.name,
        }),
      )
    }
  })
})
