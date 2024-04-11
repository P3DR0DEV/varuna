import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from '../register'
import { FindByIdUseCase } from '../find-by-id'

let usersRepository: InMemoryUsersRepository
let sut: FindByIdUseCase

describe('Find user by id use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FindByIdUseCase(usersRepository)
  })

  it('should find a single user', async () => {
    const register = new RegisterUserUseCase(usersRepository)

    let idToFind
    for (let i = 0; i < 5; i++) {
      const result = await register.execute({
        name: `any_name ${i}`,
        email: 'any_email@example.com' + i,
        phone: '(11) 11111-1111',
        badge: 'any_badge' + i,
        departmentId: 'any_department_id',
      })
      if (result.isSuccess()) {
        idToFind = result.value.user.id
      }
    }

    const result = await sut.execute('1')

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { reason } = result

      expect(reason.message).toEqual('User not found.')
    }

    if (idToFind) {
      const result2 = await sut.execute(idToFind.toString())

      expect(result2.isSuccess()).toBeTruthy()
    }
  })
})
