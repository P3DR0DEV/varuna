import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { GetUserByIdUseCase } from '../get-user-by-id'
import { makeUser } from 'test/factories/make-user'

let usersRepository: InMemoryUsersRepository
let sut: GetUserByIdUseCase

describe('Find user by id use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserByIdUseCase(usersRepository)

    const user = makeUser()

    usersRepository.create(user)
  })

  it('should find a single user', async () => {
    const id = usersRepository.items[0].id.toString()

    const result = await sut.execute({ id })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { user } = result.value
      expect(user.id.toString()).toEqual(id)
    }
  })

  it('should return a NotFoundError when id is invalid', async () => {
    const result = await sut.execute({ id: 'invalid_id' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError when id is empty', async () => {
    const result = await sut.execute({ id: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
