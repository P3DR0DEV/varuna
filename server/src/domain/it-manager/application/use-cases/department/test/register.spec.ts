import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { RegisterDepartmentUseCase } from '../register'

import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

let departmentsRepository: InMemoryDepartmentRepository
let sut: RegisterDepartmentUseCase

describe('Register Department Use Case', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new RegisterDepartmentUseCase(departmentsRepository)
  })
  it('should be able to register a department', async () => {
    const result = await sut.execute({
      chiefId: 'any_chief_id',
      description: 'department description',
      email: 'any_email@example.com',
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      expect(result.value.department).toEqual(
        expect.objectContaining({
          description: 'department description',
          slug: Slug.createFromText('department description'),
          email: 'any_email@example.com',
          chiefId: new UniqueEntityID('any_chief_id'),
        }),
      )
    }
  })
})
