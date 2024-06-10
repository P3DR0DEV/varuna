import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Workstation, WorkstationProps } from '@/domain/it-manager/enterprise/entities/workstation'

export function makeWorkstation(override: Partial<WorkstationProps> = {}, id?: UniqueEntityID) {
  const workstation = Workstation.create(
    {
      departmentId: new UniqueEntityID(),
      computerId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return workstation
}
