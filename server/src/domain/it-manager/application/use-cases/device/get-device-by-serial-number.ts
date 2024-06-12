import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

import { DeviceRepository } from '../../repositories/device-repository'

type GetDeviceBySerialumberUseCaseProps = {
  serialNumber: string
}
type GetDeviceBySerialumberUseCaseResponse = Either<BadRequestError | NotFoundError, { device: Device<DeviceProps> }>

export class GetDeviceBySerialumberUseCase implements UseCase {
  constructor(private deviceRepository: DeviceRepository) {}

  async execute({ serialNumber }: GetDeviceBySerialumberUseCaseProps): Promise<GetDeviceBySerialumberUseCaseResponse> {
    if (!serialNumber) {
      return failure(BadRequest('Serial number is required'))
    }
    const device = await this.deviceRepository.findBySerialNumber(serialNumber)

    if (!device) {
      return failure(NotFound('Device not found'))
    }

    return success({ device })
  }
}
