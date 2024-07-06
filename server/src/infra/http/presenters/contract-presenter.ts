import z from 'zod'

import { Contract } from '@/domain/it-manager/enterprise/entities/contract'
import { env } from '@/env'

export class ContractPresenter {
  static toHttp(contract: Contract) {
    return {
      id: contract.id.toString(),
      description: contract.description,
      type: contract.type,
      userEmail: contract.userEmail,
      url: `${env.BASE_URL}/${contract.fileName}`,
      fileName: contract.fileName,
      status: contract.status,
      endsAt: contract.endsAt,
    }
  }
}

export const contractSchema = z.object({
  id: z.string(),
  description: z.string(),
  type: z.enum(['renting', 'borrowing']),
  userEmail: z.string(),
  url: z.string().url(),
  fileName: z.string(),
  status: z.enum(['active', 'inactive']),
  endsAt: z.coerce.date().nullish(),
})
