import { Either, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

import { DeviceRepository } from '../../repositories/device-repository'

type FetchAllDevicesUseCaseResponse = Either<unknown, { devices: Device<DeviceProps>[] }>

export class FetchAllDevicesUseCase implements UseCase {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute(): Promise<FetchAllDevicesUseCaseResponse> {
    const devices = await this.deviceRepository.findMany()

    return success({ devices })
  }
}
