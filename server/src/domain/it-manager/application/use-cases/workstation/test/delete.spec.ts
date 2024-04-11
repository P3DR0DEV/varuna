import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'
import { DeleteUseCase } from '../delete'
import { RegisterWorkstationUseCase } from '../register'

let workspacetRepository: InMemoryWorkstationRepository
let sut: DeleteUseCase

describe('Delete workstation use case', () => {
  beforeEach(() => {
    workspacetRepository = new InMemoryWorkstationRepository()
    sut = new DeleteUseCase(workspacetRepository)
  })

  it('should be able to delete a workstation', async () => {
    const createUseCase = new RegisterWorkstationUseCase(workspacetRepository)

    const created = await createUseCase.execute({
      userId: 'any_user_id',
      deviceId: 'any_device_id',
      departmentId: 'any_department_id',
    })

    if (created.isSuccess()) {
      const { workstation } = created.value
      const result = await sut.execute(workstation.id.toString())

      expect(result.isSuccess()).toBeTruthy()
      result.isSuccess() && expect(result.value.workstationId).toEqual(workstation.id.toString())
    }
  })
})
