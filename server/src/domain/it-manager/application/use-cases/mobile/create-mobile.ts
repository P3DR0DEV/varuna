import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Mobile, MobileTypes } from '@/domain/it-manager/enterprise/entities/mobile'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import { DepartmentRepository } from '../../repositories/department-repository'
import { MobileRepository } from '../../repositories/mobile-repository'

type CreateMobileUseCaseProps = {
  name: string
  type: MobileTypes
  tag?: string | null
  operatingSystem: string
  departmentId: string
  number?: string | null
  numberProvider?: string | null
  serialNumber: string
  invoiceNumber?: string | null
  model: string
  acquisitionDate: Date
}

type CreateMobileUseCaseResponse = Either<BadRequestError | NotFoundError, { mobile: Mobile }>

export class CreateMobileUseCase implements UseCase {
  constructor(
    private mobileRepository: MobileRepository,
    private departmentRepository: DepartmentRepository,
  ) {}

  async execute(props: CreateMobileUseCaseProps): Promise<CreateMobileUseCaseResponse> {
    const department = await this.departmentRepository.findById(props.departmentId)

    if (!department) {
      return failure(NotFound('Department not found'))
    }

    const number = props.number ? Phone.format(props.number, 'pt-BR') : null

    const findName = await this.mobileRepository.findByName(props.name)

    if (findName) {
      return failure(BadRequest('Mobile already exists with this name'))
    }

    const mobile = Mobile.create({
      ...props,
      modelSlug: Slug.createFromText(props.model),
      departmentId: new UniqueEntityID(props.departmentId),
      operatingSystem: Slug.createFromText(props.operatingSystem),
      number,
      numberProvider: props.numberProvider ?? null,
    })

    await this.mobileRepository.create(mobile)

    return success({ mobile })
  }
}
