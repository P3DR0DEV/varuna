import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'

type FindByEmailUseCaseResponse = {
  user: User
}
export class FindByEmailUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute(email: string): Promise<FindByEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not found')
    }

    return { user }
  }
}
