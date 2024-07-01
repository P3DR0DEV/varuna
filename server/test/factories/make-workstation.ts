import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Workstation, WorkstationProps } from '@/domain/it-manager/enterprise/entities/workstation'
import { PrismaWorkstationMapper } from '@/infra/database/prisma/mappers/prisma-workstation-mapper'
import { PrismaClient } from '@prisma/client'

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


export class WorkstationFactory {
  constructor(private prisma: PrismaClient) {}

  async createWorkstation(data: Partial<WorkstationProps> = {}) {
    const workstation = makeWorkstation(data)
    
    await this.prisma.workstation.create({
      data: PrismaWorkstationMapper.toPersistence(workstation)
    })
    
    return workstation
  }

}