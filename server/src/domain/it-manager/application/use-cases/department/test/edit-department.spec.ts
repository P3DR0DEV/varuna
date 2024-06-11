import { makeDepartment } from 'test/factories/make-department'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'

import { EditDepartmentUseCase } from '../edit-department'

let departmentsRepository: InMemoryDepartmentRepository
let sut: EditDepartmentUseCase

describe('Edit department use case', () => {
  beforeEach(async () => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new EditDepartmentUseCase(departmentsRepository)

    const department = makeDepartment({
      name: 'CTIC',
    })

    departmentsRepository.create(department)
  })

  it('should edit a department', async () => {
    const id = departmentsRepository.items[0].id.toString()
    const result = await sut.execute({
      id,
      name: 'Recursos Humanos',
      description: 'new department description',
      email: 'any_email@example.com',
      slug: departmentsRepository.items[0].slug.value,
      chiefId: departmentsRepository.items[0].chiefId?.toString() ?? null,
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      expect(result.value.department).toEqual(
        expect.objectContaining({
          description: 'new department description',
          name: 'Recursos Humanos',
        }),
      )
    }
  })

  it('should also edit a department', async () => {
    const id = departmentsRepository.items[0].id.toString()
    const result = await sut.execute({
      id,
      name: 'Recursos Humanos',
      description: 'new department description',
      email: 'any_email@example.com',
      slug: 'teste',
      chiefId: departmentsRepository.items[0].chiefId?.toString() ?? null,
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      expect(result.value.department).toEqual(
        expect.objectContaining({
          description: 'new department description',
          name: 'Recursos Humanos',
        }),
      )
    }
  })

  it('should return a NotFoundError', async () => {
    const result = await sut.execute({
      id: 'invalid_id',
      name: '',
      chiefId: 'any_chief_id',
      description: 'new department description',
      email: 'any_email@example.com',
      slug: '',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const department = makeDepartment()
    departmentsRepository.create(department)

    const result = await sut.execute({
      id: department.id.toString(),
      chiefId: department.chiefId?.toString() ?? null,
      description: department.description,
      email: department.email ?? null,
      name: department.name,
      slug: 'ctic',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('BadRequestError')
    }
  })
})
