import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

type ContractTypes = 'renting' | 'borrowing'

export interface ContractProps {
  description: string
  type: ContractTypes
  userEmail: string
  createdAt: Date
  fileName: string
  endsAt?: Date | null
  updatedAt?: Date | null
}

export class Contract extends Entity<ContractProps> {
  get description(): string {
    return this.props.description
  }

  set description(_description: string) {
    this.props.description = _description
    this.touch()
  }

  get type(): ContractTypes {
    return this.props.type
  }

  set type(_type: ContractTypes) {
    this.props.type = _type
    this.touch()
  }

  get userEmail(): string {
    return this.props.userEmail
  }

  set userEmail(_userEmail: string) {
    this.props.userEmail = _userEmail
    this.touch()
  }

  get fileName(): string {
    return this.props.fileName
  }

  set fileName(_fileName: string) {
    this.props.fileName = _fileName
    this.touch()
  }

  get endsAt(): Date | null | undefined {
    return this.props.endsAt
  }

  set endsAt(_endsAt: Date | null) {
    this.props.endsAt = _endsAt
    this.touch()
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<ContractProps, 'createdAt'>, id?: UniqueEntityID): Contract {
    const contract = new Contract(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return contract
  }
}
