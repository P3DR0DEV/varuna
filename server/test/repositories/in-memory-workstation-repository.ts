import { WorkstationRepository } from '@/domain/it-manager/application/repositories/workstation-repository'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

export class InMemoryWorkstationRepository implements WorkstationRepository {
  public items: Workstation[] = []

  async findMany(): Promise<Workstation[]> {
    return this.items
  }

  async findById(id: string): Promise<Workstation | null> {
    const workstation = this.items.find((item) => item.id.toString() === id)
    if (!workstation) {
      return null
    }
    return workstation
  }

  async findByUserId(userId: string): Promise<Workstation[]> {
    const workstations = this.items.filter((item) => item.userId.toString() === userId)

    return workstations
  }

  async findByDeviceId(deviceId: string): Promise<Workstation | null> {
    const workstation = this.items.find((item) => item.deviceId.toString() === deviceId)
    if (!workstation) {
      return null
    }
    return workstation
  }

  async findByDepartmentId(departmentId: string): Promise<Workstation[]> {
    const workstations = this.items.filter((item) => item.departmentId.toString() === departmentId)

    return workstations
  }

  async findByUserIdAndDeviceId(userId: string, deviceId: string): Promise<Workstation | null> {
    const workstation = this.items.find(
      (item) => item.userId.toString() === userId && item.deviceId.toString() === deviceId,
    )
    if (!workstation) {
      return null
    }
    return workstation
  }

  async create(workstation: Workstation): Promise<void> {
    this.items.push(workstation)
  }

  async save(workstation: Workstation): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === workstation.id)

    this.items[itemIndex] = workstation
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(index, 1)
  }
}
