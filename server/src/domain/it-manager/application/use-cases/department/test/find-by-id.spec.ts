import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { FindByIdUseCase } from '../find-by-id'
import { RegisterDepartmentUseCase } from '../register'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let departmentsRepository: InMemoryDepartmentRepository
let sut: FindByIdUseCase

describe('Find departments by id use case', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new FindByIdUseCase(departmentsRepository)
  })

  it('should find a department by id', async () => {
    const register = new RegisterDepartmentUseCase(departmentsRepository)

    let departmentId
    for (let i = 0; i < 5; i++) {
      const { department } = await register.execute({
        chiefId: `any_chief_id ${i}`,
        description: 'department description',
        email: 'any_email@example.com',
      })
      departmentId = department.id
    }
    const { department } = await sut.execute('1')
    expect(department).toBeNull()

    if (departmentId) {
      const { department } = await sut.execute(departmentId.toString())
      expect(department).toEqual(
        expect.objectContaining({
          description: 'department description',
          slug: Slug.createFromText('department description'),
          email: 'any_email@example.com',
          chiefId: new UniqueEntityID('any_chief_id 4'),
        }),
      )
    }
  })
})
