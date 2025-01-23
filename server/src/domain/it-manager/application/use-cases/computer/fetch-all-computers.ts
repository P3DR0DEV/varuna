import { type Either, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { Computer } from '@/domain/it-manager/enterprise/entities/computer'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import type { ComputerRepository } from '../../repositories/computer-repository'

type FetchAllComputersUseCaseProps = { operatingSystem?: string | null }
type FetchAllComputersUseCaseResponse = Either<unknown, { computers: Computer[] }>

export class FetchAllComputersUseCase implements UseCase {
  constructor(private readonly computerRepository: ComputerRepository) {}

  async execute({ operatingSystem }: FetchAllComputersUseCaseProps): Promise<FetchAllComputersUseCaseResponse> {
    const os = operatingSystem ? Slug.createFromText(operatingSystem).value : undefined

    const computers = await this.computerRepository.findMany(os)

    return success({ computers })
  }
}
