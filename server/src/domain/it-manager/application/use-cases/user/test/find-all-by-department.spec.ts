import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from '../register'
import { FindAllByDepartmentUseCase } from '../find-all-by-department'

let usersRepository: InMemoryUsersRepository
let sut: FindAllByDepartmentUseCase

describe('Find users by department use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FindAllByDepartmentUseCase(usersRepository)
  })

  it('should find a list of users by department', async () => {
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

    const result = await sut.execute('any_department_id')

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { users } = result.value

      expect(users).toHaveLength(5)
    }
  })
  it('should find a single user', async () => {
    const register = new RegisterUserUseCase(usersRepository)
    for (let i = 0; i < 5; i++) {
      await register.execute({
        name: `any_name ${i}`,
        email: 'any_email@example.com' + i,
        phone: '(11) 11111-1111',
        badge: 'any_badge' + i,
        departmentId: 'any_department_id' + i,
      })
    }

    const result = await sut.execute('any_department_id0')

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { users } = result.value

      expect(users).toHaveLength(1)
    }
    expect(usersRepository.items).toHaveLength(5)
  })
})
