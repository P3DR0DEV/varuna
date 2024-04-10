import { Computer } from '@/domain/it-manager/enterprise/entities/computer'
import { ComputerRepository } from '../../repositories/computer-repository'

export class FindManyUseCase {
  constructor(private computerRepository: ComputerRepository) {}

  async execute(): Promise<Computer[]> {
    return this.computerRepository.findMany()
  }
}
