import { type Either, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import type { DeviceRepository } from '../../repositories/device-repository'

type FetchAllDevicesUseCaseResponse = Either<unknown, { devices: Device<DeviceProps>[] }>

export class FetchAllDevicesUseCase implements UseCase {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute({
    invoiceNumber,
    model,
  }: {
    invoiceNumber?: string
    model?: string
  }): Promise<FetchAllDevicesUseCaseResponse> {
    const devices = await this.deviceRepository.findMany({
      invoiceNumber,
      model: model ? Slug.createFromText(model).value : undefined,
    })

    return success({ devices })
  }
}
