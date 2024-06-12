import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

import { DeviceRepository } from '../../repositories/device-repository'

type CreateDeviceUseCaseProps = {
  serialNumber: string
  model: string
  invoiceNumber: string
  acquisitionDate: Date
}

type CreateDeviceUseCaseResponse = Either<BadRequestError, { device: Device<DeviceProps> }>

export class CreateDeviceUseCase implements UseCase {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute(props: CreateDeviceUseCaseProps): Promise<CreateDeviceUseCaseResponse> {
    const existentDevice = await this.deviceRepository.findBySerialNumber(props.serialNumber)

    if (existentDevice) {
      return failure(BadRequest('Device already exists'))
    }

    const device = Device.create(props)
    await this.deviceRepository.create(device)

    return success({ device })
  }
}
