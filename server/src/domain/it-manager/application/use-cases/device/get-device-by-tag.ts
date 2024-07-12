import { Either, failure, success } from "@/core/types/either";
import { DeviceRepository } from "../../repositories/device-repository";
import { NotFound, NotFoundError } from "@/core/errors/not-found";
import { BadRequest, BadRequestError } from "@/core/errors/bad-request";
import { Device, DeviceProps } from "@/domain/it-manager/enterprise/entities/device";

type GetDeviceByTagUseCaseProps ={
  tag: string
}

type GetDeviceByTagUseCaseResponse = Either<NotFoundError | BadRequestError, {device: Device<DeviceProps>}>
export class GetDeviceByTagUseCase {
  constructor(private readonly deviceRepository: DeviceRepository) {}

    async execute({ tag }: GetDeviceByTagUseCaseProps): Promise<GetDeviceByTagUseCaseResponse> {
      if (!tag) {
        return failure(BadRequest("Tag is required"))
      }

      const device = await this.deviceRepository.findByTag(tag)

      if (!device) {
        return failure(NotFound("Device not found"))
      }

      return success({ device })
    }
}