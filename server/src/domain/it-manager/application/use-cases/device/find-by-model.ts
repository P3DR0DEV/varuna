import { UseCase } from '@/core/use-cases/use-case'
import { DeviceRepository } from '../../repositories/device-repository'
import { Either, success } from '@/core/types/either'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

type FindByModelUseCaseResponse = Either<unknown, { devices: Device<DeviceProps>[] }>

export class FindByModelUseCase implements UseCase {
  constructor(private deviceRepository: DeviceRepository) {}

  async execute(model: string): Promise<FindByModelUseCaseResponse> {
    const devices = await this.deviceRepository.findByModel(model)

    return success({ devices })
  }
}
