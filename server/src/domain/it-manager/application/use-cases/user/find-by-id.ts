import { UsersRepository } from '../../repositories/users-repository'

export class FindByIdUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute(id: string) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    return { user }
  }
}
