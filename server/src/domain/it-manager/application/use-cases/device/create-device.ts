import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

import { DeviceRepository } from '../../repositories/device-repository'

type CreateDeviceUseCaseProps = {
  serialNumber: string
  model: string
  invoiceNumber?: string | null
  tag?: string | null
  acquisitionDate: Date
}

type CreateDeviceUseCaseResponse = Either<BadRequestError, { device: Device<DeviceProps> }>

export class CreateDeviceUseCase implements UseCase {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute(props: CreateDeviceUseCaseProps): Promise<CreateDeviceUseCaseResponse> {
    const existentDevice = await this.deviceRepository.findBySerialNumber(props.serialNumber)
    const existentTag = await this.deviceRepository.findByTag(props.tag || '')

    if (existentDevice) {
      return failure(BadRequest('Serial number already in use.'))
    }

    if (existentTag) {
      return failure(BadRequest('Tag already in use.'))
    }

    const device = Device.create(props)
    await this.deviceRepository.create(device)

    return success({ device })
  }
}
