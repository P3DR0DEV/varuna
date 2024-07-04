import z from 'zod'

import { Department } from '@/domain/it-manager/enterprise/entities/department'

export class DepartmentPresenter {
  static toHttp(department: Department) {
    return {
      id: department.id.toString(),
      name: department.name,
      description: department.description,
      slug: department.slug.value,
      chiefId: department.chiefId?.toString(),
      email: department.email,
    }
  }
}

export const departmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  slug: z.string(),
  chiefId: z.string().nullish(),
  email: z.string().email().nullish(),
})
