import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { User } from '@/domain/it-manager/enterprise/entities/user'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'

import { DepartmentRepository } from '../../repositories/department-repository'
import { UsersRepository } from '../../repositories/users-repository'
import { WorkstationRepository } from '../../repositories/workstation-repository'

type CreateUserUseCaseResponse = Either<BadRequestError | NotFoundError, { user: User }>

type CreateUserUseCaseProps = {
  name: string
  email: string
  phone?: string
  badge: string
  departmentId?: string | null
  workstationId?: string | null
}

export class CreateUserUseCase implements UseCase {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly workstationRepository: WorkstationRepository,
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  async execute({
    name,
    email,
    phone,
    badge,
    departmentId,
    workstationId,
  }: CreateUserUseCaseProps): Promise<CreateUserUseCaseResponse> {
    const registeredUser = await this.userRepository.findByBadge(badge)

    if (registeredUser) {
      return failure(BadRequest('A user with this badge already exists'))
    }

    const registeredEmail = await this.userRepository.findByEmail(email)

    if (registeredEmail) {
      return failure(BadRequest('A user with this email already exists'))
    }

    if (departmentId) {
      const department = await this.departmentRepository.findById(departmentId)

      if (!department) {
        return failure(NotFound('Department not found'))
      }
    }

    if (workstationId) {
      const workstation = await this.workstationRepository.findById(workstationId)

      if (!workstation) {
        return failure(NotFound('Workstation not found'))
      }
    }

    const user = User.create({
      name,
      email,
      phone: phone ? Phone.format(phone, 'pt-BR') : null,
      badge,
      departmentId: departmentId ? new UniqueEntityID(departmentId) : null,
      workstationId: workstationId ? new UniqueEntityID(workstationId) : null,
    })

    await this.userRepository.create(user)

    return success({ user })
  }
}
