import { makeDepartment } from 'test/factories/make-department'
import { makeLicense } from 'test/factories/make-license'
import { makeUser } from 'test/factories/make-user'
import { makeUserLicense } from 'test/factories/make-user-license'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryLicenseRepository } from 'test/repositories/in-memory-license-repository'
import { InMemoryUserLicenseRepository } from 'test/repositories/in-memory-user-license-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { GetUserLicenseByLicenseUseCase } from '../get-user-license-by-license'

let usersRepository: InMemoryUsersRepository
let licenseRepository: InMemoryLicenseRepository
let departmentRepository: InMemoryDepartmentRepository
let userLicenseRepository: InMemoryUserLicenseRepository
let sut: GetUserLicenseByLicenseUseCase

describe('Get user license by license use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    licenseRepository = new InMemoryLicenseRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    userLicenseRepository = new InMemoryUserLicenseRepository()
    sut = new GetUserLicenseByLicenseUseCase(userLicenseRepository, licenseRepository)

    const user = makeUser()
    usersRepository.create(user)

    const department = makeDepartment()
    departmentRepository.create(department)

    const license = makeLicense()
    licenseRepository.create(license)

    const userLicense = makeUserLicense({
      userId: user.id,
      licenseId: license.id,
      departmentId: department.id,
    })

    userLicenseRepository.create(userLicense)
  })

  it('should get a user license', async () => {
    const id = userLicenseRepository.items[0].licenseId.toString()

    const result = await sut.execute({
      licenseId: id,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { userLicense } = result.value
      expect(userLicense).toEqual(userLicenseRepository.items[0])
    }
  })

  it('should return a NotFoundError', async () => {
    const id = 'invalid-license-id'

    const result = await sut.execute({
      licenseId: id,
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const id = ''

    const result = await sut.execute({
      licenseId: id,
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })

  it('should return a NotFoundError if license doesnt have relations', async () => {
    const license = makeLicense()
    licenseRepository.create(license)

    // checking a valid license, but without relations
    const result = await sut.execute({
      licenseId: license.id.toString(),
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name, message } = result.reason
      expect(name).toEqual('NotFoundError')

      expect(message).toEqual('No relations found for this license')
    }
  })
})
