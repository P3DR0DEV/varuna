import { makeDepartment } from 'test/factories/make-department'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'

import { FetchAllDepartmentsUseCase } from '../fetch-all-departments'

let departmentsRepository: InMemoryDepartmentRepository
let sut: FetchAllDepartmentsUseCase

describe('Find all departments use case', () => {
  beforeAll(async () => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new FetchAllDepartmentsUseCase(departmentsRepository)

    for (let i = 0; i < 5; i++) {
      const department = makeDepartment()
      departmentsRepository.create(department)
    }
  })

  it('should find all departments', async () => {
    const result = await sut.execute()

    expect(result.isSuccess()).toBeTruthy()
    if (result.isSuccess()) {
      const { departments } = result.value

      expect(departments).toHaveLength(5)
    }
  })
})
