import { makeDepartment } from 'test/factories/make-department'
import { makeLicense } from 'test/factories/make-license'
import { makeUser } from 'test/factories/make-user'
import { makeUserLicense } from 'test/factories/make-user-license'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryLicenseRepository } from 'test/repositories/in-memory-license-repository'
import { InMemoryUserLicenseRepository } from 'test/repositories/in-memory-user-license-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { FetchUserLicenseByUserUseCase } from '../fetch-user-license-by-user'

let sut: FetchUserLicenseByUserUseCase
let usersRepository: InMemoryUsersRepository
let licenseRepository: InMemoryLicenseRepository
let departmentRepository: InMemoryDepartmentRepository
let userLicenseRepository: InMemoryUserLicenseRepository

describe('Fetch user license by user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    licenseRepository = new InMemoryLicenseRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    userLicenseRepository = new InMemoryUserLicenseRepository()
    sut = new FetchUserLicenseByUserUseCase(userLicenseRepository, usersRepository)

    const user = makeUser()
    usersRepository.create(user)

    const department = makeDepartment()
    departmentRepository.create(department)

    for (let i = 0; i < 10; i++) {
      const license = makeLicense()
      licenseRepository.create(license)

      const userLicense = makeUserLicense({
        userId: user.id,
        licenseId: license.id,
        departmentId: department.id,
      })

      userLicenseRepository.create(userLicense)
    }
  })

  it('should fetch user license by user', async () => {
    const id = usersRepository.items[0].id.toString()

    const result = await sut.execute({ userId: id })

    expect(result.isSuccess()).toBe(true)

    if (result.isSuccess()) {
      const { userLicense } = result.value
      expect(userLicense).toHaveLength(10)
    }
  })

  it('should return a NotFoundError', async () => {
    const id = 'invalid-user-id'

    const result = await sut.execute({ userId: id })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const id = ''

    const result = await sut.execute({ userId: id })

    expect(result.isFailure()).toBe(true)

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
