import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

import { DeviceRepository } from '../../repositories/device-repository'

type GetDeviceByIdUseCaseProps = {
  id: string
}
type GetDeviceByIdUseCaseResponse = Either<NotFoundError | BadRequestError, { device: Device<DeviceProps> }>

export class GetDeviceByIdUseCase implements UseCase {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute({ id }: GetDeviceByIdUseCaseProps): Promise<GetDeviceByIdUseCaseResponse> {
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
