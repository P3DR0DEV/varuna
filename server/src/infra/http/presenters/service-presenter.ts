import { Service } from "@/domain/it-manager/enterprise/entities/service";
import z from "zod";

export class ServicePresenter {
  static toHttp(service: Service) {
    const {} = service
    return {
      id: service.id.toString(),
      description: service.description,
      name: service.name,
      url: `${service.ipAddress}:${service.port}`,
      type: service.type
    }
  }
}

export const serviceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
  type: z.enum(['application', 'database', 'infra'])
})