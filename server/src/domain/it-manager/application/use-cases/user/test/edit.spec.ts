import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from '../register'
import { EditUserUseCase } from '../edit'

let usersRepository: InMemoryUsersRepository
let sut: EditUserUseCase

describe('Edit User use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new EditUserUseCase(usersRepository)
  })

  it('should edit a user', async () => {
    const register = new RegisterUserUseCase(usersRepository)

    let idToEdit
    for (let i = 0; i < 5; i++) {
      const result = await register.execute({
        name: `any_name ${i}`,
        email: 'any_email@example.com' + i,
        phone: '(11) 11111-1111',
        badge: 'any_badge' + i,
        departmentId: 'any_department_id',
      })
      if (result.isSuccess()) {
        idToEdit = result.value.user.id
      }
    }

    if (idToEdit) {
      const result = await sut.execute({
        id: idToEdit.toString(),
        name: 'updatedName',
        email: 'updatedName@example.com',
        phone: '(11) 11111-1111',
        departmentId: 'any_department_id',
      })

      expect(result.isSuccess()).toBeTruthy()

      if (result.isSuccess()) {
        const { user } = result.value
        expect(user.name).toEqual('updatedName')
        expect(user.email).toEqual('updatedName@example.com')
      }
    }
  })
})
