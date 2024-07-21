import z from 'zod'

import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

export class WorkstationPresenter {
  static toHttp(workstation: Workstation) {
    return {
      id: workstation.id.toString(),
      computerId: workstation.computerId.toString(),
      departmentId: workstation.departmentId.toString(),
    }
  }
}

export const workstationSchema = z.object({
  id: z.string(),
  computerId: z.string(),
  departmentId: z.string(),
})
