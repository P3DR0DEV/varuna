import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'

type CreateUserUseCaseResponse = Either<BadRequestError, { user: User }>

type CreateUserUseCaseProps = {
  name: string
  email: string
  phone?: string
  badge: string
  departmentId?: string
}

export class CreateUserUseCase implements UseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute({
    name,
    email,
    phone,
    badge,
    departmentId,
  }: CreateUserUseCaseProps): Promise<CreateUserUseCaseResponse> {
    const registeredUser = await this.userRepository.findByBadge(badge)

    if (registeredUser) {
      return failure(BadRequest('A user with this badge already exists'))
    }

    const registeredEmail = await this.userRepository.findByEmail(email)

    if (registeredEmail) {
      return failure(BadRequest('A user with this email already exists'))
    }

    const user = User.create({
      name,
      email,
      phone: phone ? Phone.format(phone, 'pt-BR') : null,
      badge,
      departmentId: new UniqueEntityID(departmentId),
    })

    await this.userRepository.create(user)

    return success({ user })
  }
}
