import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type RegisterUserUseCaseResponse = {
  user: User
}

type RegisterUserUseCaseRequest = {
  name: string
  email: string
  phone: string
  badge: string
  departmentId: string
}

export class RegisterUserUseCase {
  constructor(private userRepository: UsersRepository) {}
  async execute(user: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const registeredUser = await this.userRepository.findByBadge(user.badge)

    if (registeredUser) {
      throw new Error('A user with this badge already exists')
    }

    const registeredEmail = await this.userRepository.findByEmail(user.email)

    if (registeredEmail) {
      throw new Error('A user with this email already exists')
    }

    const userCreated = User.create({
      name: user.name,
      email: user.email,
      phone: Phone.format(user.phone, 'pt-BR'),
      badge: user.badge,
      departmentId: new UniqueEntityID(user.departmentId),
    })

    await this.userRepository.create(userCreated)

    return { user: userCreated }
  }
}
