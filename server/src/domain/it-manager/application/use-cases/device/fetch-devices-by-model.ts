import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

import { DeviceRepository } from '../../repositories/device-repository'

type FetchDevicesByModelUseCaseProps = {
  model: string
}
type FetchDevicesByModelUseCaseResponse = Either<BadRequestError, { devices: Device<DeviceProps>[] }>

export class FetchDevicesByModelUseCase implements UseCase {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute({ model }: FetchDevicesByModelUseCaseProps): Promise<FetchDevicesByModelUseCaseResponse> {
    if (!model) {
      return failure(BadRequest('Model is required'))
    }

    const devices = await this.deviceRepository.findByModel(model)

    return success({ devices })
  }
}
