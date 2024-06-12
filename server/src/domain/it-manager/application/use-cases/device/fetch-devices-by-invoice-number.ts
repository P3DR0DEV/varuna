import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

import { DeviceRepository } from '../../repositories/device-repository'

type FetchDevicesByInvoiceNumberUseCaseProps = {
  invoiceNumber: string
}
type FetchDevicesByInvoiceNumberUseCaseResponse = Either<BadRequestError, { devices: Device<DeviceProps>[] }>

export class FetchDevicesByInvoiceNumberUseCase implements UseCase {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute({
    invoiceNumber,
  }: FetchDevicesByInvoiceNumberUseCaseProps): Promise<FetchDevicesByInvoiceNumberUseCaseResponse> {
    if (!invoiceNumber) {
      return failure(BadRequest('Invoice number is required'))
    }

    const devices = await this.deviceRepository.findByInvoiceNumber(invoiceNumber)

    return success({ devices })
  }
}
