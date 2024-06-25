import { makeDepartment } from 'test/factories/make-department'
import { makeLicense } from 'test/factories/make-license'
import { makeUser } from 'test/factories/make-user'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryLicenseRepository } from 'test/repositories/in-memory-license-repository'
import { InMemoryUserLicenseRepository } from 'test/repositories/in-memory-user-license-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { CreateUserLicenseUseCase } from '../create-user-license'

let sut: CreateUserLicenseUseCase
let usersRepository: InMemoryUsersRepository
let licenseRepository: InMemoryLicenseRepository
let departmentRepository: InMemoryDepartmentRepository
let userLicenseRepository: InMemoryUserLicenseRepository

describe('Create user license use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    licenseRepository = new InMemoryLicenseRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    userLicenseRepository = new InMemoryUserLicenseRepository()
    sut = new CreateUserLicenseUseCase(userLicenseRepository, usersRepository, licenseRepository, departmentRepository)

    const user = makeUser()
    usersRepository.create(user)

    const department = makeDepartment()
    departmentRepository.create(department)

    const license = makeLicense()
    licenseRepository.create(license)
  })

  it('should create a user license relationship', async () => {
    const departmentId = departmentRepository.items[0].id.toString()
    const licenseId = licenseRepository.items[0].id.toString()
    const userId = usersRepository.items[0].id.toString()

    const result = await sut.execute({
      departmentId,
      licenseId,
      userId,
    })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { userLicense } = result.value
      expect(userLicense.licenseId.toString()).toEqual(licenseId)
      expect(userLicense.userId.toString()).toEqual(userId)
    }
  })

  it('should return a NotFoundError on invalid user', async () => {
    const departmentId = departmentRepository.items[0].id.toString()
    const licenseId = licenseRepository.items[0].id.toString()
    const userId = 'invalid_user_id'

    const result = await sut.execute({
      departmentId,
      licenseId,
      userId,
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a NotFoundError on invalid license', async () => {
    const departmentId = departmentRepository.items[0].id.toString()
    const licenseId = 'invalid_license_id'
    const userId = usersRepository.items[0].id.toString()

    const result = await sut.execute({
      departmentId,
      licenseId,
      userId,
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a NotFoundError on invalid department', async () => {
    const departmentId = 'invalid_department_id'
    const licenseId = licenseRepository.items[0].id.toString()
    const userId = usersRepository.items[0].id.toString()

    const result = await sut.execute({
      departmentId,
      licenseId,
      userId,
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError on invalid data', async () => {
    const result = await sut.execute({
      departmentId: '',
      licenseId: '',
      userId: '',
    })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
