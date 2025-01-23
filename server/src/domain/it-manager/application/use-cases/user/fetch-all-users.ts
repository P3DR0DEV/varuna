import { type Either, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import type { User } from '@/domain/it-manager/enterprise/entities/user'

import type { UsersRepository } from '../../repositories/users-repository'

type FetchAllUserUseCaseResponse = Either<unknown, { users: User[] }>

export class FetchAllUserUseCase implements UseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(): Promise<FetchAllUserUseCaseResponse> {
    const users = await this.userRepository.findMany()

    return success({ users })
  }
}
