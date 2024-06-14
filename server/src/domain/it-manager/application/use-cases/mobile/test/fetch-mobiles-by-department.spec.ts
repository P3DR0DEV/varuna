import { makeDepartment } from 'test/factories/make-department'
import { makeMobile } from 'test/factories/make-mobile'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryMobileRepository } from 'test/repositories/in-memory-mobile-repository'

import { FetchMobilesByDepartmentUseCase } from '../fetch-mobiles-by-department'

let departmentRepository: InMemoryDepartmentRepository
let mobileRepository: InMemoryMobileRepository
let sut: FetchMobilesByDepartmentUseCase

describe('Fetch mobiles by department use case', () => {
  beforeEach(() => {
    mobileRepository = new InMemoryMobileRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    sut = new FetchMobilesByDepartmentUseCase(mobileRepository, departmentRepository)

    const department = makeDepartment()
    departmentRepository.create(department)

    for (let i = 0; i < 10; i++) {
      const mobile = makeMobile({
        departmentId: department.id,
      })
      mobileRepository.create(mobile)
    }
  })

  it('should fetch mobiles by department', async () => {
    const id = departmentRepository.items[0].id.toString()
    const result = await sut.execute({ departmentId: id })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { mobiles } = result.value
      expect(mobiles).toHaveLength(10)
    }
  })

  it('should return NotFoundError', async () => {
    const id = 'invalid-id'
    const result = await sut.execute({ departmentId: id })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return BadRequestError', async () => {
    const id = ''
    const result = await sut.execute({ departmentId: id })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
