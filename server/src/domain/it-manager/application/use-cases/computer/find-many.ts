import { Computer } from '@/domain/it-manager/enterprise/entities/computer'
import { ComputerRepository } from '../../repositories/computer-repository'
import { UseCase } from '@/core/use-cases/use-case'
import { Either, success } from '@/core/types/either'

type FindManyUseCaseResponse = Either<unknown, { computers: Computer[] }>
export class FindManyUseCase implements UseCase {
  constructor(private computerRepository: ComputerRepository) {}

  async execute(operatingSystem?: string): Promise<FindManyUseCaseResponse> {
    const computers = await this.computerRepository.findMany(operatingSystem)

    return success({ computers })
  }
}
