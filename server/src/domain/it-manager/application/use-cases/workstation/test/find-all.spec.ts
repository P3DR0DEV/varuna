import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'
import { FindAllUseCase } from '../find-all'
import { RegisterWorkstationUseCase } from '../register'

let workstationRepository: InMemoryWorkstationRepository
let sut: FindAllUseCase

describe('Find all workstation use case', () => {
  beforeEach(() => {
    workstationRepository = new InMemoryWorkstationRepository()
    sut = new FindAllUseCase(workstationRepository)
  })

  it('should be able to find all workstations', async () => {
    const register = new RegisterWorkstationUseCase(workstationRepository)
    for (let i = 0; i < 5; i++) {
      await register.execute({
        userId: 'any_user_id',
        deviceId: 'any_device_id',
        departmentId: 'any_department_id',
      })
    }

    const result = await sut.execute()

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { workstations } = result.value

      expect(workstations).toHaveLength(5)
    }
  })
})
