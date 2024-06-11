import { makeDepartment } from 'test/factories/make-department'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'

import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import { GetDepartmentBySlugUseCase } from '../get-department-by-slug'

let departmentsRepository: InMemoryDepartmentRepository
let sut: GetDepartmentBySlugUseCase

describe('Find a department by slug use case', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new GetDepartmentBySlugUseCase(departmentsRepository)

    const department = makeDepartment({
      name: 'CTIC',
    })

    departmentsRepository.create(department)
  })

  it('should find a department by slug', async () => {
    const result = await sut.execute({ slug: 'ctic' })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { department } = result.value

      expect(department).toEqual(
        expect.objectContaining({
          name: 'CTIC',
          slug: Slug.createFromText('CTIC'),
        }),
      )
    }
  })
})
