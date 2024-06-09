import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { FindBySlugUseCase } from '../find-by-slug'
import { RegisterDepartmentUseCase } from '../register'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let departmentsRepository: InMemoryDepartmentRepository
let sut: FindBySlugUseCase

describe('Find a department by slug use case', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new FindBySlugUseCase(departmentsRepository)
  })

  it('should find a department by slug', async () => {
    const register = new RegisterDepartmentUseCase(departmentsRepository)

    for (let i = 0; i < 5; i++) {
      await register.execute({
        description: 'department description ' + i,
        email: 'any_email@example.com',
      })
    }

    const result = await sut.execute(Slug.createFromText('department description 0').value)

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { department } = result.value

      expect(department).toEqual(
        expect.objectContaining({
          description: 'department description 0',
          slug: Slug.createFromText('department description 0'),
          email: 'any_email@example.com',
        }),
      )
    }
  })
})
