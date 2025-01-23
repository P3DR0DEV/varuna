import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { NotFound, type NotFoundError } from '@/core/errors/not-found'
import { type Either, failure, success } from '@/core/types/either'
import type { UseCase } from '@/core/use-cases/use-case'
import { Mobile, type MobileTypes } from '@/domain/it-manager/enterprise/entities/mobile'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import type { DepartmentRepository } from '../../repositories/department-repository'
import type { MobileRepository } from '../../repositories/mobile-repository'

type CreateMobileUseCaseProps = {
  name: string
  type: MobileTypes
  tag?: string | null
  operatingSystem: string
  departmentId?: string | null
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
    if (props.departmentId) {
      const department = await this.departmentRepository.findById(props.departmentId)

      if (!department) {
        return failure(NotFound('Department not found'))
      }
    }

    const number = props.number ? Phone.format(props.number, 'pt-BR') : null

    const findName = await this.mobileRepository.findByName(props.name)
    const findTag = await this.mobileRepository.findByTag(props.tag ?? '')

    if (findName) {
      return failure(BadRequest('Mobile already exists with this name'))
    }

    if (findTag) {
      return failure(BadRequest('Mobile already exists with this tag'))
    }

    const mobile = Mobile.create({
      ...props,
      modelSlug: Slug.createFromText(props.model),
      departmentId: props.departmentId ? new UniqueEntityID(props.departmentId) : null,
      operatingSystem: Slug.createFromText(props.operatingSystem),
      number,
      numberProvider: props.numberProvider ?? null,
    })

    await this.mobileRepository.create(mobile)

    return success({ mobile })
  }
}
