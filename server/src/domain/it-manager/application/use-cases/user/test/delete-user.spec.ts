import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { DeleteUserUseCase } from '../delete-user'
import { makeUser } from 'test/factories/make-user'

let usersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(usersRepository)

    const user = makeUser()

    usersRepository.create(user)
  })

  it('should delete a user', async () => {
    const result = await sut.execute({ id: usersRepository.items[0].id.toString() })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { message } = result.value
      expect(message).toEqual('User deleted successfully')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({ id: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { reason } = result
      expect(reason.name).toEqual('BadRequestError')
    }
  })
})
