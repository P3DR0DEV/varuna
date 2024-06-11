import { makeDepartment } from 'test/factories/make-department'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'

import { GetDepartmentByIdUseCase } from '../get-department-by-id'

let departmentsRepository: InMemoryDepartmentRepository
let sut: GetDepartmentByIdUseCase

describe('Find departments by id use case', () => {
  beforeEach(async () => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new GetDepartmentByIdUseCase(departmentsRepository)

    const department = makeDepartment()

    departmentsRepository.create(department)
  })

  it('should find a department by id', async () => {
    const id = departmentsRepository.items[0].id.toString()
    const result = await sut.execute({ id })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { department } = result.value

      expect(department.id).toBeTruthy()
    }
  })

  it('should return a NotFoundError', async () => {
    const result = await sut.execute({ id: 'invalid_id' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({ id: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('BadRequestError')
    }
  })
})
