import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'
import { RegisterWorkstationUseCase } from '../register'

let workstationRepository: InMemoryWorkstationRepository
let sut: RegisterWorkstationUseCase

describe('Register workstation use case', () => {
  beforeEach(() => {
    workstationRepository = new InMemoryWorkstationRepository()
    sut = new RegisterWorkstationUseCase(workstationRepository)
  })

  it('should be able to register a workstation', async () => {
    const result = await sut.execute({
      userId: 'any_user_id',
      deviceId: 'any_device_id',
      departmentId: 'any_department_id',
    })

    expect(result.isSuccess()).toBeTruthy()
  })
})
