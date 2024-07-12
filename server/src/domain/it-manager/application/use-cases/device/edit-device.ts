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
  tag?: string | null
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
    tag,
  }: EditDeviceUseCaseProps): Promise<EditDeviceUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const device = await this.deviceRepository.findById(id)

    const serialNumberExists = await this.deviceRepository.findBySerialNumber(serialNumber)
    const tagExists = await this.deviceRepository.findByTag(tag || '')

    if (serialNumberExists && serialNumberExists.id.toString() !== id) {
      return failure(BadRequest('Serial number already exists for another device'))
    }

    if (tagExists && tagExists.id.toString() !== id) {
      return failure(BadRequest('Tag already exists for another device'))
    }

    if (!device) {
      return failure(NotFound('Device not found'))
    }

    device.model = model
    device.acquisitionDate = acquisitionDate
    device.serialNumber = serialNumber
    device.invoiceNumber = invoiceNumber
    device.endWarrantyDate = endWarrantyDate
    device.tag = tag

    await this.deviceRepository.save(device)

    return success({ device })
  }
}
