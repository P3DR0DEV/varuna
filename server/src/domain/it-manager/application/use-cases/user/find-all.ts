import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { Either, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'

type FindAllUseCaseResponse = Either<unknown, { users: User[] }>

export class FindAllUseCase implements UseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(): Promise<FindAllUseCaseResponse> {
    const users = await this.userRepository.findMany()

    return success({ users })
  }
}
