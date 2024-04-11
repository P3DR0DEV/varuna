import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from '../register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('should be able to register a user', async () => {
    const result = await sut.execute({
      name: 'any_name',
      email: 'any_email@example.com',
      phone: '(11) 11111-1111',
      badge: 'any_badge',
      departmentId: 'any_department_id',
    })

    expect(result.isSuccess()).toBeTruthy()

    expect(usersRepository.items).toHaveLength(1)
  })
})
