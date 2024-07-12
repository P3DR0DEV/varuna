import { makeDepartment } from 'test/factories/make-department'
import { makeMobile } from 'test/factories/make-mobile'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryMobileRepository } from 'test/repositories/in-memory-mobile-repository'

import { FetchAllMobilesUseCase } from '../fetch-all-mobiles'

let departmentRepository: InMemoryDepartmentRepository
let mobileRepository: InMemoryMobileRepository
let sut: FetchAllMobilesUseCase

describe('Find all mobiles use case', () => {
  beforeEach(() => {
    mobileRepository = new InMemoryMobileRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    sut = new FetchAllMobilesUseCase(mobileRepository)

    const department = makeDepartment()
    departmentRepository.create(department)

    for (let i = 0; i < 10; i++) {
      const mobile = makeMobile({
        departmentId: department.id,
      })
      mobileRepository.create(mobile)
    }
  })

  it('should find all mobiles', async () => {
    const result = await sut.execute({})

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { mobiles } = result.value
      expect(mobiles).toHaveLength(10)
    }
  })
})
