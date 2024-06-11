import { makeDepartment } from 'test/factories/make-department'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'

import { DeleteDepartmentUseCase } from '../delete-department'

let departmentsRepository: InMemoryDepartmentRepository
let sut: DeleteDepartmentUseCase

describe('Delete Department Use Case', () => {
  beforeEach(async () => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new DeleteDepartmentUseCase(departmentsRepository)

    const department = makeDepartment()
    departmentsRepository.create(department)
  })

  it('should delete a department', async () => {
    const id = departmentsRepository.items[0].id.toString()
    const result = await sut.execute({ id })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { message } = result.value
      expect(message).toEqual('Department deleted successfully')
    }
  })

  it('should return a NotFoundError', async () => {
    const id = departmentsRepository.items[0].id.toString()
    // delete the department for the first time
    await sut.execute({ id })

    // tries to delete it again
    const result = await sut.execute({ id })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    // tries to delete an empty id
    const result = await sut.execute({ id: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
