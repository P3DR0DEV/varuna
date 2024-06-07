import { UseCase } from '@/core/use-cases/use-case'
import { DeviceRepository } from '../../repositories/device-repository'
import { Either, failure, success } from '@/core/types/either'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

type EditDeviceUseCaseRequest = {
  id: string
  model: string
  acquisitionDate: Date
  serialNumber: string
  invoiceNumber: string
  endWarrantyDate: Date
}

type EditDeviceUseCaseResponse = Either<NotFoundError, { device: Device<DeviceProps> }>

export class EditDeviceUseCase implements UseCase {
  constructor(private deviceRepository: DeviceRepository) {}

  async execute(props: EditDeviceUseCaseRequest): Promise<EditDeviceUseCaseResponse> {
    const device = await this.deviceRepository.findById(props.id)

    if (!device) {
      return failure(NotFound('Device not found'))
    }

    device.model = props.model
    device.acquisitionDate = props.acquisitionDate
    device.serialNumber = props.serialNumber
    device.invoiceNumber = props.invoiceNumber
    device.endWarrantyDate = props.endWarrantyDate

    await this.deviceRepository.save(device)

    return success({ device })
  }
}
