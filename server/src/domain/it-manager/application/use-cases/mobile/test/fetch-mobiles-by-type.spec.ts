import { makeDepartment } from 'test/factories/make-department'
import { makeMobile } from 'test/factories/make-mobile'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryMobileRepository } from 'test/repositories/in-memory-mobile-repository'

import { FetchMobilesByTypeUseCase } from '../fetch-mobiles-by-type'

let departmentRepository: InMemoryDepartmentRepository
let mobileRepository: InMemoryMobileRepository
let sut: FetchMobilesByTypeUseCase

describe('Fetch mobiles by type use case', () => {
  beforeEach(() => {
    mobileRepository = new InMemoryMobileRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    sut = new FetchMobilesByTypeUseCase(mobileRepository)

    const department = makeDepartment()
    departmentRepository.create(department)

    for (let i = 0; i < 10; i++) {
      const mobile = makeMobile({
        departmentId: department.id,
      })
      mobileRepository.create(mobile)
    }
  })

  it('should fetch mobiles by type', async () => {
    const result = await sut.execute({ type: 'cellphone' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { mobiles } = result.value

      mobiles.forEach((m) => {
        expect(m.type).toEqual('cellphone')
      })
    }
  })

  it('should return BadRequestError if type is empty', async () => {
    // @ts-expect-error
    const result = await sut.execute({ type: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })

  it('should return BadRequestError if type is different than MobileTypes', async () => {
    // @ts-expect-error
    const result = await sut.execute({ type: 'iphone' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
