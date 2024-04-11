import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from '../register'
import { FindByEmailUseCase } from '../find-by-email'

let usersRepository: InMemoryUsersRepository
let sut: FindByEmailUseCase

describe('Find user by email use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FindByEmailUseCase(usersRepository)
  })

  it('should find a single user', async () => {
    const register = new RegisterUserUseCase(usersRepository)

    let emailToFind
    for (let i = 0; i < 5; i++) {
      const result = await register.execute({
        name: `any_name ${i}`,
        email: 'any_email@example.com' + i,
        phone: '(11) 11111-1111',
        badge: 'any_badge' + i,
        departmentId: 'any_department_id',
      })
      if (result.isSuccess()) {
        emailToFind = result.value.user.email
      }

      if (emailToFind) {
        const result = await sut.execute(emailToFind)

        expect(result.isSuccess()).toBeTruthy()
      }
    }
  })
})
