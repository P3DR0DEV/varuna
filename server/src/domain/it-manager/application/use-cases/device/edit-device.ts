import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

import { DeviceRepository } from '../../repositories/device-repository'

type EditDeviceUseCaseProps = {
  id: string
  model: string
  acquisitionDate: Date
  serialNumber: string
  invoiceNumber?: string | null
  endWarrantyDate?: Date | null
}

type EditDeviceUseCaseResponse = Either<BadRequestError | NotFoundError, { device: Device<DeviceProps> }>

export class EditDeviceUseCase implements UseCase {
  constructor(private deviceRepository: DeviceRepository) {}

  async execute({
    id,
    model,
    acquisitionDate,
    serialNumber,
    invoiceNumber,
    endWarrantyDate,
  }: EditDeviceUseCaseProps): Promise<EditDeviceUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const device = await this.deviceRepository.findById(id)

    if (!device) {
      return failure(NotFound('Device not found'))
    }

    device.model = model
    device.acquisitionDate = acquisitionDate
    device.serialNumber = serialNumber
    device.invoiceNumber = invoiceNumber
    device.endWarrantyDate = endWarrantyDate

    await this.deviceRepository.save(device)

    return success({ device })
  }
}
