import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'

import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import { CreateDepartmentUseCase } from '../create-department'

let departmentsRepository: InMemoryDepartmentRepository
let sut: CreateDepartmentUseCase

describe('Register Department Use Case', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new CreateDepartmentUseCase(departmentsRepository)
  })

  it('should be able to register a department', async () => {
    const result = await sut.execute({
      name: 'Recursos Humanos',
      description: 'department description',
      email: 'any_email@example.com',
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      expect(result.value.department).toEqual(
        expect.objectContaining({
          description: 'department description',
          email: 'any_email@example.com',
          slug: Slug.createFromText('recursos-humanos'),
        }),
      )
    }
  })

  it('should not be able to register a department with same slug', async () => {
    await sut.execute({
      name: 'Recursos Humanos',
      description: 'RH supervisionado por.... ',
      email: 'any_email@example.com',
    })

    const result = await sut.execute({
      name: 'Recursos Humanos',
      description: 'Recursos Humanos',
      email: 'any_email@example.com',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
