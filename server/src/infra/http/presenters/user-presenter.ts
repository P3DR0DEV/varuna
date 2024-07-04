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
