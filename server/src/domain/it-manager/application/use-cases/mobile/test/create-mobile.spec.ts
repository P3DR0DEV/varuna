import { makeDepartment } from 'test/factories/make-department'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryMobileRepository } from 'test/repositories/in-memory-mobile-repository'

import { CreateMobileUseCase } from '../create-mobile'

let mobileRepository: InMemoryMobileRepository
let departmentRepository: InMemoryDepartmentRepository
let sut: CreateMobileUseCase

describe('Create Mobile Use Case', () => {
  beforeEach(() => {
    mobileRepository = new InMemoryMobileRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    sut = new CreateMobileUseCase(mobileRepository, departmentRepository)

    const department = makeDepartment()

    departmentRepository.create(department)
  })

  it('should create a new mobile', async () => {
    const result = await sut.execute({
      name: 'Mobile 1',
      type: 'cellphone',
      operatingSystem: 'Android',
      departmentId: departmentRepository.items[0].id.toString(),
      number: '11999999999',
      numberProvider: 'Claro',
      serialNumber: '123456789',
      invoiceNumber: '123456',
      acquisitionDate: new Date('2022-01-01'),
      model: 'Iphone 15 Pro',
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { mobile } = result.value

      expect(mobile).toEqual(
        expect.objectContaining({
          type: 'cellphone',
          modelSlug: 'iphone-15-pro',
        }),
      )
    }
  })

  it('should return NotFoundError', async () => {
    const result = await sut.execute({
      name: 'Mobile 1',
      type: 'cellphone',
      operatingSystem: 'Android',
      departmentId: 'invalid_id',
      number: '11999999999',
      numberProvider: 'Claro',
      serialNumber: '123456789',
      invoiceNumber: '123456',
      acquisitionDate: new Date('2022-01-01'),
      model: 'Iphone 15 Pro',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return BadRequestError', async () => {
    await sut.execute({
      name: 'DP01',
      type: 'cellphone',
      operatingSystem: 'Android',
      departmentId: departmentRepository.items[0].id.toString(),
      number: '11999999999',
      numberProvider: 'Claro',
      serialNumber: '123456789',
      invoiceNumber: '123456',
      acquisitionDate: new Date('2022-01-01'),
      model: 'Iphone 15 Pro',
    })

    const result = await sut.execute({
      name: 'DP01',
      type: 'cellphone',
      operatingSystem: 'Android',
      departmentId: departmentRepository.items[0].id.toString(),
      number: '11999999999',
      numberProvider: 'Claro',
      serialNumber: '123456789',
      invoiceNumber: '123456',
      acquisitionDate: new Date('2022-01-01'),
      model: 'Iphone 15 Pro',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
