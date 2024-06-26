import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { CreateUserUseCase } from '../create-user'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Register user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
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

  it('should return a BadRequestError when user already exists with same email', async () => {
    await sut.execute({
      name: 'any_name',
      email: 'any_email@example.com',
      phone: '(11) 11111-1111',
      badge: '012345',
    })

    const result = await sut.execute({
      name: 'any_name',
      email: 'any_email@example.com',
      phone: '(11) 11111-1111',
      badge: '123456',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { reason } = result
      expect(reason.name).toEqual('BadRequestError')
    }
  })

  it('should return a BadRequestError when user already exists with same badge', async () => {
    await sut.execute({
      name: 'any_name',
      email: 'any_email@example.com',
      phone: '(11) 11111-1111',
      badge: 'any_badge',
    })

    const result = await sut.execute({
      name: 'any_name',
      email: 'valid_email@example.com',
      phone: '(11) 11111-1111',
      badge: 'any_badge',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { reason } = result
      expect(reason.name).toEqual('BadRequestError')
    }
  })
})