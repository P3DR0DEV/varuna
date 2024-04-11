import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { FindAllUseCase } from '../find-all'
import { RegisterDepartmentUseCase } from '../register'

let departmentsRepository: InMemoryDepartmentRepository
let sut: FindAllUseCase

describe('Find all departments use case', () => {
  beforeAll(async () => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new FindAllUseCase(departmentsRepository)
  })
  it('should find all departments', async () => {
    const register = new RegisterDepartmentUseCase(departmentsRepository)

    for (let i = 0; i < 5; i++) {
      await register.execute({
        chiefId: `any_chief_id ${i}`,
        description: 'department description',
        email: 'any_email@example.com',
      })
    }
    const { departments } = await sut.execute()
    expect(departments).toHaveLength(5)
  })
})
