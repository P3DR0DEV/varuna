import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

import type { DeviceRepository } from '../../repositories/device-repository'

type GetDeviceBySerialNumberUseCaseProps = {
  serialNumber: string
}
type GetDeviceBySerialNumberUseCaseResponse = Either<BadRequestError | NotFoundError, { device: Device<DeviceProps> }>

export class GetDeviceBySerialNumberUseCase implements UseCase {
  constructor(private deviceRepository: DeviceRepository) {}

  async execute({
    serialNumber,
  }: GetDeviceBySerialNumberUseCaseProps): Promise<GetDeviceBySerialNumberUseCaseResponse> {
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
