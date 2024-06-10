import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Incident, IncidentProps } from '@/domain/it-manager/enterprise/entities/incident'

export function makeIncident(override: Partial<IncidentProps> = {}, id?: UniqueEntityID) {
  const incident = Incident.create(
    {
      description: faker.lorem.sentence(),
      workstationId: new UniqueEntityID(),
      deviceId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return incident
}
