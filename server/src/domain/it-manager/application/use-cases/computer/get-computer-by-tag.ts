import { Either, failure, success } from "@/core/types/either";
import { ComputerRepository } from "../../repositories/computer-repository";
import { BadRequest, BadRequestError } from "@/core/errors/bad-request";
import { NotFound, NotFoundError } from "@/core/errors/not-found";
import { Computer } from "@/domain/it-manager/enterprise/entities/computer";

type GetComputerByTagUseCaseProps = {
  tag: string
}

type GetComputerByTagUseCaseResponse = Either<NotFoundError|BadRequestError, {computer: Computer}>

export class GetComputerByTagUseCase {
  constructor(private readonly computerRepository: ComputerRepository) {}

  async execute({ tag }: GetComputerByTagUseCaseProps): Promise<GetComputerByTagUseCaseResponse> {
    if (!tag) {
      return failure(BadRequest('Tag is required'))
    }

    const computer = await this.computerRepository.findByTag(tag)

    if (!computer) {
      return failure(NotFound('Computer not found'))
    }

    return success({ computer })
  }
}