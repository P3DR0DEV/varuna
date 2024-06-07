import { UseCase } from '@/core/use-cases/use-case'
import { DeviceRepository } from '../../repositories/device-repository'
import { Either, failure, success } from '@/core/types/either'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

type FindByIdUseCaseResponse = Either<NotFoundError | BadRequestError, { device: Device<DeviceProps> }>

export class FindByIdUseCase implements UseCase {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute(id: string): Promise<FindByIdUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }
    const device = await this.deviceRepository.findById(id)

    if (!device) {
      return failure(NotFound('Device not found'))
    }

    return success({ device })
  }
}
