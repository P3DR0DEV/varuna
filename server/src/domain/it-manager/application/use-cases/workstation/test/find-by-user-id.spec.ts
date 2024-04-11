import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'
import { FindByUserIdUseCase } from '../find-by-user-id'
import { RegisterWorkstationUseCase } from '../register'

let workstationRepository: InMemoryWorkstationRepository
let sut: FindByUserIdUseCase

describe('FindByUserIdUseCase', () => {
  beforeEach(() => {
    workstationRepository = new InMemoryWorkstationRepository()
    sut = new FindByUserIdUseCase(workstationRepository)
  })

  it('should be able to find workstations by user', async () => {
    const register = new RegisterWorkstationUseCase(workstationRepository)

    await register.execute({
      userId: 'any_user_id',
      deviceId: 'any_device_id',
      departmentId: 'any_department_id',
    })

    const result = await sut.execute('any_user_id')

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { workstations } = result.value

      expect(workstations).toHaveLength(1)
    }
  })
})
