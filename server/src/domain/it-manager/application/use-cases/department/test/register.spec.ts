import { RegisterDepartmentUseCase } from '../register'

import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'

let departmentsRepository: InMemoryDepartmentRepository
let sut: RegisterDepartmentUseCase

describe('Register Department Use Case', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new RegisterDepartmentUseCase(departmentsRepository)
  })

  it('should be able to register a department', async () => {
    const result = await sut.execute({
      description: 'department description',
      email: 'any_email@example.com',
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      expect(result.value.department).toEqual(
        expect.objectContaining({
          description: 'department description',
          email: 'any_email@example.com',
        }),
      )
    }
  })
})
