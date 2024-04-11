import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'
import { RegisterWorkstationUseCase } from '../register'
import { FindByDepartmentIdUseCase } from '../find-by-department-id'

let workspacetRepository: InMemoryWorkstationRepository
let sut: FindByDepartmentIdUseCase

describe('Delete workstation use case', () => {
  beforeEach(() => {
    workspacetRepository = new InMemoryWorkstationRepository()
    sut = new FindByDepartmentIdUseCase(workspacetRepository)
  })

  it('should be able to delete a workstation', async () => {
    const createUseCase = new RegisterWorkstationUseCase(workspacetRepository)

    await createUseCase.execute({
      userId: 'any_user_id',
      deviceId: 'any_device_id',
      departmentId: 'any_department_id',
    })
    const result = await sut.execute('any_department_id')

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { workstations } = result.value

      expect(workstations).toHaveLength(1)
    }
  })
})
