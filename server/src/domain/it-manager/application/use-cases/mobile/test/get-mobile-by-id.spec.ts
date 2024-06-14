import { makeDepartment } from 'test/factories/make-department'
import { makeMobile } from 'test/factories/make-mobile'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryMobileRepository } from 'test/repositories/in-memory-mobile-repository'

import { GetMobileByIdUseCase } from '../get-mobile-by-id'

let departmentRepository: InMemoryDepartmentRepository
let mobileRepository: InMemoryMobileRepository
let sut: GetMobileByIdUseCase

describe('Get mobile by id use case', () => {
  beforeEach(() => {
    mobileRepository = new InMemoryMobileRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    sut = new GetMobileByIdUseCase(mobileRepository)

    const department = makeDepartment()
    departmentRepository.create(department)

    for (let i = 0; i < 10; i++) {
      const mobile = makeMobile({
        departmentId: department.id,
      })
      mobileRepository.create(mobile)
    }
  })

  it('should get a mobile by id', async () => {
    const item = mobileRepository.items[0]
    const result = await sut.execute({ id: item.id.toString() })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { mobile } = result.value
      expect(mobile).toEqual(item)
    }
  })

  it('should return a BadRequestError', async () => {
    const id = ''

    const result = await sut.execute({ id })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })

  it('should return a NotFoundError', async () => {
    const id = 'invalid_id'

    const result = await sut.execute({ id })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })
})
