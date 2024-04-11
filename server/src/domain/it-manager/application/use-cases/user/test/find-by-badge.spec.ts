import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from '../register'
import { FindByBadgeUseCase } from '../find-by-badge'

let usersRepository: InMemoryUsersRepository
let sut: FindByBadgeUseCase

describe('Find by badge use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FindByBadgeUseCase(usersRepository)
  })

  it('should find a user by badge', async () => {
    const register = new RegisterUserUseCase(usersRepository)

    for (let i = 0; i < 5; i++) {
      await register.execute({
        name: `any_name ${i}`,
        email: 'any_email@example.com' + i,
        phone: '(11) 11111-1111',
        badge: 'any_badge' + i,
        departmentId: 'any_department_id',
      })
    }

    const result = await sut.execute('any_badge0')

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { user } = result.value

      expect(user).toEqual(
        expect.objectContaining({
          badge: 'any_badge0',
          name: 'any_name 0',
          email: 'any_email@example.com0',
        }),
      )
    }

    const result2 = await sut.execute('inexistent_badge')

    expect(result2.isFailure()).toBeTruthy()
  })
})
