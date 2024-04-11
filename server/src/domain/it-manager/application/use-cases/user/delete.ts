import { UsersRepository } from '../../repositories/users-repository'

export type DeleteUseCaseResponse = {
  userId: string
}

export class DeleteUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    await this.usersRepository.delete(id)

    return { userId: id }
  }
}
