import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'

type FindAllUseCaseResponse = {
  users: User[]
}

export class FindAllUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(): Promise<FindAllUseCaseResponse> {
    const users = await this.userRepository.findMany()

    return { users }
  }
}
