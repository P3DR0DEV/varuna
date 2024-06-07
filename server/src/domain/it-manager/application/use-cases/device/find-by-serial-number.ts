import { UseCase } from '@/core/use-cases/use-case'
import { DeviceRepository } from '../../repositories/device-repository'
import { Either, failure, success } from '@/core/types/either'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

type FindBySerialNumberUseCaseResponse = Either<BadRequestError | NotFoundError, { device: Device<DeviceProps> }>

export class FindBySerialNumberUseCase implements UseCase {
  constructor(private deviceRepository: DeviceRepository) {}

  async execute(serialNumber: string): Promise<FindBySerialNumberUseCaseResponse> {
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
