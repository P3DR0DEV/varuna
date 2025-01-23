import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'

import type { DeviceRepository } from '../../repositories/device-repository'

type DeleteDeviceUseCaseProps = {
  id: string
}
type DeleteDeviceUseCaseResponse = Either<NotFoundError | BadRequestError, { message: string }>

export class DeleteDeviceUseCase implements UseCase {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute({ id }: DeleteDeviceUseCaseProps): Promise<DeleteDeviceUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Device id is required'))
    }

    const device = await this.deviceRepository.findById(id)

    if (!device) {
      return failure(NotFound('This device does not exist or already has been deleted'))
    }

    await this.deviceRepository.delete(id)

    return success({ message: 'Device deleted successfully' })
  }
}
