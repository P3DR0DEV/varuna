import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'
import { EditWorkstationUseCase } from '../edit'
import { RegisterWorkstationUseCase } from '../register'
import { FindByUserDeviceIdUseCase } from '../find-by-user-device-id'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let workstationRepository: InMemoryWorkstationRepository
let sut: EditWorkstationUseCase

describe('Edit workstation use case', () => {
  beforeEach(() => {
    workstationRepository = new InMemoryWorkstationRepository()
    sut = new EditWorkstationUseCase(workstationRepository)
  })

  it('should be able to edit a workstation', async () => {
    const register = new RegisterWorkstationUseCase(workstationRepository)

    await register.execute({
      userId: 'any_user_id',
      deviceId: 'any_device_id',
      departmentId: 'any_department_id',
    })

    const find = new FindByUserDeviceIdUseCase(workstationRepository)

    const result = await find.execute('any_user_id', 'any_device_id')

    if (result.isSuccess()) {
      const { workstation } = result.value
      const edited = await sut.execute({
        id: workstation.id,
        userId: 'new_user_id',
        deviceId: 'new_device_id',
        departmentId: 'new_department_id',
      })

      if (edited.isSuccess()) {
        const { workstation } = edited.value

        expect(workstation).toEqual(
          expect.objectContaining({
            userId: new UniqueEntityID('new_user_id'),
            deviceId: new UniqueEntityID('new_device_id'),
            departmentId: new UniqueEntityID('new_department_id'),
          }),
        )
      }
    }
  })
})
