import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { DeleteDepartmentUseCase } from '../delete'
import { RegisterDepartmentUseCase } from '../register'

let departmentsRepository: InMemoryDepartmentRepository
let sut: DeleteDepartmentUseCase

describe('Delete Department Use Case', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new DeleteDepartmentUseCase(departmentsRepository)
  })

  it('should delete a department', async () => {
    const register = new RegisterDepartmentUseCase(departmentsRepository)
    const { department } = await register.execute({
      chiefId: 'any_chief_id',
      description: 'department description',
      email: 'any_email@example.com',
    })

    expect(departmentsRepository.items).toHaveLength(1)

    sut.execute(department.id.toString())

    expect(departmentsRepository.items).toHaveLength(0)
  })
})
