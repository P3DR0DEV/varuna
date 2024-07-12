import { Either, failure, success } from "@/core/types/either";
import { MobileRepository } from "../../repositories/mobile-repository";
import { NotFound, NotFoundError } from "@/core/errors/not-found";
import { BadRequest, BadRequestError } from "@/core/errors/bad-request";
import { Mobile } from "@/domain/it-manager/enterprise/entities/mobile";

type GetDeviceByTagUseCaseProps = {
  tag: string
}

type GetDeviceByTagUseCaseResponse = Either<NotFoundError|BadRequestError, {mobile: Mobile}>


export class GetMobileByTagUseCase {
  constructor(private readonly mobileRepository: MobileRepository) {}

  async execute({tag}: GetDeviceByTagUseCaseProps): Promise<GetDeviceByTagUseCaseResponse>{

    if(!tag) {
      return failure(BadRequest("Tag is required"))
    }

    const mobile = await this.mobileRepository.findByTag(tag)

    if(!mobile) {
      return failure(NotFound("Mobile not found"))
    }

    return success({mobile})
  }
}