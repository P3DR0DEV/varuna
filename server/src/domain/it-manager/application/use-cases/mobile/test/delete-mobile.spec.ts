import { makeDepartment } from 'test/factories/make-department'
import { makeMobile } from 'test/factories/make-mobile'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryMobileRepository } from 'test/repositories/in-memory-mobile-repository'

import { DeleteMobileUseCase } from '../delete-mobile'

let departmentRepository: InMemoryDepartmentRepository
let mobileRepository: InMemoryMobileRepository
let sut: DeleteMobileUseCase

describe('Delete mobile use case', () => {
  beforeEach(() => {
    mobileRepository = new InMemoryMobileRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    sut = new DeleteMobileUseCase(mobileRepository)

    const department = makeDepartment()
    departmentRepository.create(department)

    const mobile = makeMobile({
      departmentId: department.id,
    })

    mobileRepository.create(mobile)
  })

  it('should delete a mobile', async () => {
    const result = await sut.execute({
      id: mobileRepository.items[0].id.toString(),
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { message } = result.value
      expect(message).toEqual('Mobile deleted successfully')
    }
  })

  it('should return a NotFoundError', async () => {
    const id = mobileRepository.items[0].id.toString()

    // delete the mobile for the first time
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
    const id = ''

    const result = await sut.execute({ id })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
