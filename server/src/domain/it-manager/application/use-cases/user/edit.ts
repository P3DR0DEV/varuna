import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type EditUserUseCaseRequest = {
  id: string
  name: string
  email: string
  phone: string | null
  departmentId: string
}

type EditUserUseCaseResponse = {
  user: User
}
export class EditUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(user: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const userExists = await this.usersRepository.findById(user.id)

    if (!userExists) {
      throw new Error('User not found')
    }

    userExists.name = user.name
    userExists.email = user.email
    userExists.phone = user.phone ? Phone.format(user.phone, 'pt-BR') : userExists.phone
    userExists.departmentId = new UniqueEntityID(user.departmentId)

    await this.usersRepository.save(userExists)

    return {
      user: userExists,
    }
  }
}
