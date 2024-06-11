import { makeDepartment } from 'test/factories/make-department'
import { makeUser } from 'test/factories/make-user'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { AddChiefToDepartmentUseCase } from '../add-chief-to-department'

let departmentRepository: InMemoryDepartmentRepository
let usersRepository: InMemoryUsersRepository
let sut: AddChiefToDepartmentUseCase

describe('Add chief to department use case', () => {
  beforeEach(async () => {
    departmentRepository = new InMemoryDepartmentRepository()
    usersRepository = new InMemoryUsersRepository()

    const user = makeUser()
    usersRepository.create(user)

    const department = makeDepartment()
    departmentRepository.create(department)

    sut = new AddChiefToDepartmentUseCase(departmentRepository, usersRepository)
  })

  it('should add a chief to a department', async () => {
    const departmentId = departmentRepository.items[0].id.toString()
    const chiefId = usersRepository.items[0].id.toString()

    const result = await sut.execute({
      departmentId,
      chiefId,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { department } = result.value
      expect(department.chiefId?.toString()).toEqual(chiefId)
    }
  })

  it('should return a NotFoundError on invalid department', async () => {
    const chiefId = usersRepository.items[0].id.toString()

    const result = await sut.execute({
      departmentId: 'invalid_department_id',
      chiefId,
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { message } = result.reason
      expect(message).toEqual('Department not found')
    }
  })

  it('should return a NotFoundError on invalid user', async () => {
    const departmentId = departmentRepository.items[0].id.toString()

    const result = await sut.execute({
      departmentId,
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
