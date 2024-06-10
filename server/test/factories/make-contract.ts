import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Contract, ContractProps } from '@/domain/it-manager/enterprise/entities/contract'

export function makeContract(override: Partial<ContractProps> = {}, id?: UniqueEntityID) {
  const contract = Contract.create(
    {
      fileName: faker.system.commonFileName(),
      description: faker.commerce.productDescription(),
      userEmail: faker.internet.email(),
      endsAt: faker.date.future(),
      type: 'renting',
      ...override,
    },
    id,
  )

  return contract
}
