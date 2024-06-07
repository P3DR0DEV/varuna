import { UseCase } from '@/core/use-cases/use-case'
import { DeviceRepository } from '../../repositories/device-repository'
import { Either, success } from '@/core/types/either'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

type FindAllUseCaseResponse = Either<unknown, { devices: Device<DeviceProps>[] }>

export class FindAllUseCase implements UseCase {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute(): Promise<FindAllUseCaseResponse> {
    const devices = await this.deviceRepository.findMany()

    return success({ devices })
  }
}
