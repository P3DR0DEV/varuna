import { makeDepartment } from 'test/factories/make-department'
import { makeMobile } from 'test/factories/make-mobile'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryMobileRepository } from 'test/repositories/in-memory-mobile-repository'

import { GetMobileByNameUseCase } from '../get-mobile-by-name'

let departmentRepository: InMemoryDepartmentRepository
let mobileRepository: InMemoryMobileRepository
let sut: GetMobileByNameUseCase

describe('Get mobile by name use case', () => {
  beforeEach(() => {
    mobileRepository = new InMemoryMobileRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    sut = new GetMobileByNameUseCase(mobileRepository)

    const department = makeDepartment()
    departmentRepository.create(department)

    const mobile = makeMobile({
      name: 'DP01',
      departmentId: department.id,
    })
    mobileRepository.create(mobile)
  })

  it('should get a mobile by name', async () => {
    const result = await sut.execute({ name: 'DP01' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { mobile } = result.value
      expect(mobile.name).toEqual('DP01')
    }
  })

  it('should return a BadRequestError', async () => {
    const name = ''

    const result = await sut.execute({ name })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name: errorName } = result.reason
      expect(errorName).toEqual('BadRequestError')
    }
  })

  it('should return a NotFoundError', async () => {
    const name = 'invalid_name'

    const result = await sut.execute({ name })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name: errorName } = result.reason
      expect(errorName).toEqual('NotFoundError')
    }
  })
})
