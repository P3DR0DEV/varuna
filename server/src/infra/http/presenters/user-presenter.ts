import z from 'zod'

import { User } from '@/domain/it-manager/enterprise/entities/user'

export class UserPresenter {
  static toHttp(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone ? user.phone.value : null,
      badge: user.badge,
      departmentId: user.departmentId.toString(),
      workstationId: user.workstationId ? user.workstationId.toString() : null,
    }
  }
}

export const usersSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  badge: z.string(),
  departmentId: z.string(),
  workstationId: z.string().nullable(),
})
