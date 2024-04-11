import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'
import { FindByIdUseCase } from '../find-by-id'
import { RegisterWorkstationUseCase } from '../register'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let workstationRepository: InMemoryWorkstationRepository
let sut: FindByIdUseCase

describe('Find by id workstation use case', () => {
  beforeEach(() => {
    workstationRepository = new InMemoryWorkstationRepository()
    sut = new FindByIdUseCase(workstationRepository)
  })

  it('should be able to find a workstation by id', async () => {
    const createUseCase = new RegisterWorkstationUseCase(workstationRepository)

    const created = await createUseCase.execute({
      userId: 'any_user_id',
      deviceId: 'any_device_id',
      departmentId: 'any_department_id',
    })

    if (created.isSuccess()) {
      const { workstation } = created.value
      const result = await sut.execute(workstation.id.toString())

      expect(result.isSuccess()).toBeTruthy()

      if (result.isSuccess()) {
        const { workstation } = result.value

        expect(workstation).toEqual(
          expect.objectContaining({
            userId: new UniqueEntityID('any_user_id'),
            deviceId: new UniqueEntityID('any_device_id'),
            departmentId: new UniqueEntityID('any_department_id'),
          }),
        )
      }
    }
  })
})
