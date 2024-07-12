import { Computer } from '../../enterprise/entities/computer'

export interface ComputerRepository {
  findById(id: string): Promise<Computer | null>
  findMany(operatingSystem?: string): Promise<Computer[]>
  findByHostname(hostname: string): Promise<Computer | null>
  findByIpAddress(ipAddress: string): Promise<Computer | null>
  findByTag(tag: string): Promise<Computer | null>

  create(computer: Computer): Promise<void>
  save(computer: Computer): Promise<void>
  delete(id: string): Promise<void>
}
