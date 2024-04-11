import { User } from '@/domain/it-manager/enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, failure, success } from '@/core/types/either'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { UseCase } from '@/core/use-cases/use-case'

type EditUserUseCaseRequest = {
  id: string
  name: string
  email: string
  phone: string | null
  departmentId: string
}

type EditUserUseCaseResponse = Either<NotFoundError, { user: User }>

export class EditUserUseCase implements UseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(user: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const userExists = await this.usersRepository.findById(user.id)

    if (!userExists) {
      return failure(NotFound('User not found'))
    }

    userExists.name = user.name
    userExists.email = user.email
    userExists.phone = user.phone ? Phone.format(user.phone, 'pt-BR') : userExists.phone
    userExists.departmentId = new UniqueEntityID(user.departmentId)

    await this.usersRepository.save(userExists)

    return success({ user: userExists })
  }
}
