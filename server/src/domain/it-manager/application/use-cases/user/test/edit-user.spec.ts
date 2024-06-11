import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { EditUserUseCase } from '../edit-user'

let usersRepository: InMemoryUsersRepository
let sut: EditUserUseCase

describe('Edit User use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new EditUserUseCase(usersRepository)
    const user = makeUser({
      email: 'any_email@example.com',
    })

    const user2 = makeUser()

    usersRepository.create(user)
    usersRepository.create(user2)
  })

  it('should edit a user', async () => {
    const user = usersRepository.items[0]

    const result = await sut.execute({
      id: user.id.toString(),
      name: user.name,
      badge: user.badge,
      email: 'updatedName@example.com',
      phone: user.phone?.value || null,
      departmentId: user.departmentId?.toString() || null,
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { user } = result.value
      expect(user.email).toEqual('updatedName@example.com')
    }
  })

  it('should return a BadRequestError when id is empty', async () => {
    const result = await sut.execute({
      id: '',
      name: 'any_name',
      badge: 'any_badge',
      email: 'any_email@example.com',
      phone: 'any_phone',
      departmentId: 'any_department_id',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })

  it('should return a NotFoundError when id is invalid', async () => {
    const result = await sut.execute({
      id: 'invalid_id',
      name: 'any_name',
      badge: 'any_badge',
      email: 'any_email@example.com',
      phone: 'any_phone',
      departmentId: 'any_department_id',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError when trying to update a user to a used email or badge', async () => {
    const user = usersRepository.items[1]

    const result = await sut.execute({
      id: user.id.toString(),
      name: user.name,
      badge: user.badge,
      email: 'any_email@example.com',
      phone: user.phone?.value || null,
      departmentId: user.departmentId?.toString() || null,
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('BadRequestError')
    }
  })
})
