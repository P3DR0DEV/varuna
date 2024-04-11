import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'

type RegisterUserUseCaseResponse = Either<BadRequestError, { user: User }>

type RegisterUserUseCaseRequest = {
  name: string
  email: string
  phone: string
  badge: string
  departmentId: string
}

export class RegisterUserUseCase implements UseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(user: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const registeredUser = await this.userRepository.findByBadge(user.badge)

    if (registeredUser) {
      return failure(BadRequest('A user with this badge already exists'))
    }

    const registeredEmail = await this.userRepository.findByEmail(user.email)

    if (registeredEmail) {
      return failure(BadRequest('A user with this email already exists'))
    }

    const userCreated = User.create({
      name: user.name,
      email: user.email,
      phone: Phone.format(user.phone, 'pt-BR'),
      badge: user.badge,
      departmentId: new UniqueEntityID(user.departmentId),
    })

    await this.userRepository.create(userCreated)

    return success({ user: userCreated })
  }
}
