import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { DeviceRepository } from '../../repositories/device-repository'

type DeleteDeviceUseCaseResponse = Either<NotFoundError | BadRequestError, { deviceId: string }>

export class DeleteDeviceUseCase implements UseCase {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute(id: string): Promise<DeleteDeviceUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Device id is required'))
    }

    const device = await this.deviceRepository.findById(id)

    if (!device) {
      return failure(NotFound('This device does not exist or already has been deleted'))
    }

    await this.deviceRepository.delete(id)

    return success({ deviceId: id })
  }
}
