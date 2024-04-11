import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from '../register'
import { DeleteUseCase } from '../delete'

let usersRepository: InMemoryUsersRepository
let sut: DeleteUseCase

describe('Delete user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUseCase(usersRepository)
  })

  it('should delete a user', async () => {
    const register = new RegisterUserUseCase(usersRepository)

    let idToDelete
    for (let i = 0; i < 5; i++) {
      const result = await register.execute({
        name: `any_name ${i}`,
        email: 'any_email@example.com' + i,
        phone: '(11) 11111-1111',
        badge: 'any_badge' + i,
        departmentId: 'any_department_id',
      })
      if (result.isSuccess()) {
        idToDelete = result.value.user.id
      }
    }

    if (idToDelete) {
      const result = await sut.execute(idToDelete.toString())

      expect(result.isSuccess()).toBeTruthy()

      if (result.isSuccess()) {
        const { userId } = result.value
        expect(userId).toEqual(idToDelete.toString())
      }
    }

    const result = await sut.execute('1')
    expect(result.isFailure()).toBeTruthy()
  })
})
