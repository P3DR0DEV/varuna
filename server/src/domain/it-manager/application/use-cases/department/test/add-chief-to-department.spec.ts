import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { AddChiefToDepartmentUseCase } from '../add-chief-to-department'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterDepartmentUseCase } from '../register'
import { RegisterUserUseCase } from '../../user/register'

let departmentRepository: InMemoryDepartmentRepository
let usersRepository: InMemoryUsersRepository
let register: RegisterDepartmentUseCase
let registerUser: RegisterUserUseCase
let sut: AddChiefToDepartmentUseCase

describe('Add chief to department use case', () => {
  beforeEach(async () => {
    departmentRepository = new InMemoryDepartmentRepository()
    usersRepository = new InMemoryUsersRepository()
    register = new RegisterDepartmentUseCase(departmentRepository)
    registerUser = new RegisterUserUseCase(usersRepository)
    sut = new AddChiefToDepartmentUseCase(departmentRepository, usersRepository)

    await registerUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      badge: '123456789',
    })

    await register.execute({
      description: 'Recursos Humanos',
      email: 'rh@example.com',
    })
  })

  it('should add a chief to a department', async () => {
    const result = await sut.execute({
      departmentId: departmentRepository.items[0].id.toString(),
      chiefId: usersRepository.items[0].id.toString(),
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { department } = result.value
      expect(department.chiefId).toEqual(usersRepository.items[0].id)
    }
  })

  it('should return a NotFoundError on invalid department', async () => {
    const result = await sut.execute({
      departmentId: 'invalid_department_id',
      chiefId: usersRepository.items[0].id.toString(),
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { message } = result.reason
      expect(message).toEqual('Department not found')
    }
  })

  it('should return a NotFoundError on invalid user', async () => {
    const result = await sut.execute({
      departmentId: departmentRepository.items[0].id.toString(),
      chiefId: 'invalid_user_id',
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { message } = result.reason
      expect(message).toEqual('User not found')
    }
  })

  it('should return a BadRequestError on invalid data', async () => {
    const result = await sut.execute({
      departmentId: '',
      chiefId: '',
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
