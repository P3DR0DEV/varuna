import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'

type FindByBadgeUseCaseResponse = {
  user: User
}
export class FindByBadgeUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(badge: string): Promise<FindByBadgeUseCaseResponse> {
    const user = await this.usersRepository.findByBadge(badge)

    if (!user) {
      throw new Error('User not found for the provided badge')
    }

    return { user }
  }
}
