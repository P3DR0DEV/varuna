import { makeDepartment } from 'test/factories/make-department'
import { makeUser } from 'test/factories/make-user'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { FetchAllUsersByDepartmentUseCase } from '../fetch-all-users-by-department'

let usersRepository: InMemoryUsersRepository
let departmentRepository: InMemoryDepartmentRepository
let sut: FetchAllUsersByDepartmentUseCase

describe('Find users by department use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    sut = new FetchAllUsersByDepartmentUseCase(usersRepository, departmentRepository)

    const department = makeDepartment()
    departmentRepository.create(department)

    for (let i = 0; i < 5; i++) {
      const user = makeUser({
        departmentId: department.id,
      })
      usersRepository.create(user)
    }
  })

  it('should find a list of users by department', async () => {
    const departmentId = departmentRepository.items[0].id.toString()
    const result = await sut.execute({ departmentId })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { users } = result.value

      expect(users).toHaveLength(5)
    }
  })

  it('should return a NotFoundError', async () => {
    // tries to find a department that does not exist
    const result = await sut.execute({ departmentId: 'any_department_id0' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({ departmentId: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
