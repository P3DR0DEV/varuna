import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BadRequest, BadRequestError } from '@/core/errors/bad-request'
import { NotFound, NotFoundError } from '@/core/errors/not-found'
import { Either, failure, success } from '@/core/types/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Mobile, MobileTypes } from '@/domain/it-manager/enterprise/entities/mobile'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import { MobileRepository } from '../../repositories/mobile-repository'

type EditMobileUseCaseProps = {
  id: string
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
  endWarrantyDate?: Date | null
}
type EditMobileUseCaseResponse = Either<NotFoundError | BadRequestError, { mobile: Mobile }>

export class EditMobileUseCase implements UseCase {
  constructor(private readonly mobileRepository: MobileRepository) {}

  async execute({ id, ...props }: EditMobileUseCaseProps): Promise<EditMobileUseCaseResponse> {
    if (!id) {
      return failure(BadRequest('ID is required'))
    }

    const mobile = await this.mobileRepository.findById(id)

    if (!mobile) {
      return failure(NotFound('Mobile not found'))
    }

    const findName = await this.mobileRepository.findByName(props.name)
    const findTag = await this.mobileRepository.findByTag(props.tag ?? '')

    if (findName && findName.id.toString() !== id) {
      return failure(BadRequest('Mobile already exists with this name'))
    }

    if (findTag && findTag.id.toString() !== id) {
      return failure(BadRequest('Mobile already exists with this tag'))
    }

    mobile.name = props.name
    mobile.acquisitionDate = props.acquisitionDate
    mobile.type = props.type
    mobile.operatingSystem = Slug.createFromText(props.operatingSystem)
    mobile.departmentId = props.departmentId ? new UniqueEntityID(props.departmentId) : null
    mobile.number = props.number ? Phone.format(props.number, 'pt-BR') : null
    mobile.numberProvider = props.numberProvider ?? null
    mobile.serialNumber = props.serialNumber
    mobile.invoiceNumber = props.invoiceNumber
    mobile.model = props.model
    mobile.endWarrantyDate = props.endWarrantyDate
    mobile.tag = props.tag

    return success({ mobile })
  }
}
