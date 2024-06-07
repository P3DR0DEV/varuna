import { UseCase } from '@/core/use-cases/use-case'
import { DeviceRepository } from '../../repositories/device-repository'
import { Either, success } from '@/core/types/either'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

type FindByInvoiceNumberUseCaseResponse = Either<unknown, { devices: Device<DeviceProps>[] }>

export class FindByInvoiceNumberUseCase implements UseCase {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute(invoiceNumber: string): Promise<FindByInvoiceNumberUseCaseResponse> {
    const devices = await this.deviceRepository.findByInvoiceNumber(invoiceNumber)

    return success({ devices })
  }
}
