import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, failure, success } from '@/core/types/either'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'

type EditUserUseCaseProps = {
  id: string
  name: string
  badge: string
  email: string
  phone: string | null
  departmentId: string | null
}

type EditUserUseCaseResponse = Either<BadRequestError | NotFoundError, { user: User }>

export class EditUserUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    badge,
    email,
    phone,
    departmentId,
  }: EditUserUseCaseProps): Promise<EditUserUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('Id is required'))
    }

    const user = await this.usersRepository.findById(id)

    if (!user) {
      return failure(NotFound('User not found'))
    }

    if (user.email !== email) {
      const userWithSameEmail = await this.usersRepository.findByEmail(email)

      if (userWithSameEmail) {
        return failure(BadRequest('Email already in use by another user'))
      }
    }

    if (user.badge !== badge) {
      const userWithSameBadge = await this.usersRepository.findByBadge(badge)

      if (userWithSameBadge) {
        return failure(BadRequest('Badge already in use by another user'))
      }
    }

    user.name = name
    user.badge = badge
    user.email = email
    user.phone = phone ? Phone.format(phone, 'pt-BR') : user.phone
    user.departmentId = departmentId ? new UniqueEntityID(departmentId) : user.departmentId

    await this.usersRepository.save(user)

    return success({ user })
  }
}
