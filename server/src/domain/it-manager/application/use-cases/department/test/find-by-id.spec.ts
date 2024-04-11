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
      const result = await register.execute({
        chiefId: `any_chief_id ${i}`,
        description: 'department description',
        email: 'any_email@example.com',
      })
      departmentId = result.isSuccess() && result.value.department.id
    }
    const result = await sut.execute('1')
    expect(result.isFailure).toBeTruthy()

    if (departmentId) {
      const result = await sut.execute(departmentId.toString())

      expect(result.isSuccess()).toBeTruthy()
      if (result.isSuccess()) {
        const { department } = result.value

        expect(department).toEqual(
          expect.objectContaining({
            description: 'department description',
            slug: Slug.createFromText('department description'),
            email: 'any_email@example.com',
            chiefId: new UniqueEntityID('any_chief_id 4'),
          }),
        )
      }
    }
  })
})
