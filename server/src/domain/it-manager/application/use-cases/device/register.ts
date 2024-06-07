import { UseCase } from '@/core/use-cases/use-case'
import { DeviceRepository } from '../../repositories/device-repository'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'

type RegisterDeviceRequest = {
  serialNumber: string
  model: string
  invoiceNumber: string
  acquisitionDate: Date
}

type RegisterDeviceResponse = Either<BadRequestError, { device: Device<DeviceProps> }>

export class RegisterDeviceUseCase implements UseCase {
  constructor(private deviceRepository: DeviceRepository) {}

  async execute(props: RegisterDeviceRequest): Promise<RegisterDeviceResponse> {
    const existentDevice = await this.deviceRepository.findBySerialNumber(props.serialNumber)

    if (existentDevice) {
      return failure(BadRequest('Device already exists'))
    }

    const device = Device.create(props)
    await this.deviceRepository.create(device)

    return success({ device })
  }
}
