import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

export interface WorkstationRepository {
  findMany(): Promise<Workstation[]>
  findById(id: string): Promise<Workstation | null>
  findByUserId(userId: string): Promise<Workstation[]>
  findByDeviceId(deviceId: string): Promise<Workstation | null>
  findByDepartmentId(departmentId: string): Promise<Workstation[]>
  findByUserIdAndDeviceId(userId: string, deviceId: string): Promise<Workstation | null>

  create(workstation: Workstation): Promise<void>
  save(workstation: Workstation): Promise<void>
  delete(id: string): Promise<void>
}
