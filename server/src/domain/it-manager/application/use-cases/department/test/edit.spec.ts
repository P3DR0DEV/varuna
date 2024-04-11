import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { EditDepartmentUseCase } from '../edit'
import { RegisterDepartmentUseCase } from '../register'
import { FindBySlugUseCase } from '../find-by-slug'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

let departmentsRepository: InMemoryDepartmentRepository
let sut: EditDepartmentUseCase
describe('Edit department use case', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new EditDepartmentUseCase(departmentsRepository)
  })

  it('should edit a department', async () => {
    const register = new RegisterDepartmentUseCase(departmentsRepository)
    const departmentToFind = new FindBySlugUseCase(departmentsRepository)
    for (let i = 0; i < 5; i++) {
      await register.execute({
        chiefId: `any_chief_id ${i}`,
        description: 'department description ' + i,
        email: 'any_email@example.com',
      })
    }

    const { department } = await departmentToFind.execute(Slug.createFromText('department description 0').value)

    if (department) {
      const { department: edited } = await sut.execute({
        id: department.id.toString(),
        chiefId: 'any_chief_id',
        description: 'new department description',
        email: 'any_email@example.com',
      })
      expect(edited.description).toEqual('new department description')
      expect(edited.updatedAt).toBeInstanceOf(Date)
    }
  })
})
