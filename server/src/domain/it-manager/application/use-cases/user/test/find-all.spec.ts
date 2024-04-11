import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FindAllUseCase } from '../find-all'
import { RegisterUserUseCase } from '../register'

let usersRepository: InMemoryUsersRepository
let sut: FindAllUseCase

describe('Find all users use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FindAllUseCase(usersRepository)
  })

  it('should find all users', async () => {
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
    const result = await sut.execute()
    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { users } = result.value

      expect(users).toHaveLength(5)
    }
  })
})
