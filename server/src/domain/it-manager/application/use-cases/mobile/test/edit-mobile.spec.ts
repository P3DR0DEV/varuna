import { makeDepartment } from 'test/factories/make-department'
import { makeMobile } from 'test/factories/make-mobile'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryMobileRepository } from 'test/repositories/in-memory-mobile-repository'

import { EditMobileUseCase } from '../edit-mobile'

let departmentRepository: InMemoryDepartmentRepository
let mobileRepository: InMemoryMobileRepository
let sut: EditMobileUseCase

describe('Edit mobile use case', () => {
  beforeEach(() => {
    mobileRepository = new InMemoryMobileRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    sut = new EditMobileUseCase(mobileRepository)

    const department = makeDepartment()
    departmentRepository.create(department)

    for (let i = 0; i < 10; i++) {
      const mobile = makeMobile({
        departmentId: department.id,
      })
      mobileRepository.create(mobile)
    }
  })

  it('should edit a mobile', async () => {
    const item = mobileRepository.items[0]

    const result = await sut.execute({
      id: item.id.toString(),
      name: 'new name',
      type: item.type,
      operatingSystem: 'android',
      departmentId: item.departmentId.toString(),
      number: item.number?.value,
      numberProvider: 'vivo',
      serialNumber: item.serialNumber,
      acquisitionDate: item.acquisitionDate,
      model: item.model,
      endWarrantyDate: item.endWarrantyDate,
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { mobile } = result.value
      expect(mobile.id).toEqual(item.id)
      expect(mobile.name).toEqual('new name')
    }
  })

  it('should return a NotFoundError', async () => {
    const id = 'invalid_id'

    const result = await sut.execute({
      id,
      name: 'new name',
      type: 'cellphone',
      operatingSystem: 'android',
      departmentId: 'invalid_department_id',
      number: '123456789',
      numberProvider: 'vivo',
      serialNumber: '123456789',
      acquisitionDate: new Date(),
      model: 'model',
      endWarrantyDate: new Date(),
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name: errorName } = result.reason
      expect(errorName).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const id = ''

    const result = await sut.execute({
      id,
      name: 'new name',
      type: 'cellphone',
      operatingSystem: 'android',
      departmentId: 'invalid_department_id',
      number: '123456789',
      numberProvider: 'vivo',
      serialNumber: '123456789',
      acquisitionDate: new Date(),
      model: 'model',
      endWarrantyDate: new Date(),
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })

  it('should return a BadRequestError when name already exists', async () => {
    const item = mobileRepository.items[0]

    const result = await sut.execute({
      id: item.id.toString(),
      name: mobileRepository.items[1].name,
      type: item.type,
      operatingSystem: 'android',
      departmentId: item.departmentId.toString(),
      number: item.number?.value,
      numberProvider: 'vivo',
      serialNumber: item.serialNumber,
      acquisitionDate: item.acquisitionDate,
      model: item.model,
      endWarrantyDate: item.endWarrantyDate,
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
