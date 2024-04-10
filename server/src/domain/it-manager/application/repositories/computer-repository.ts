import { Computer } from '../../enterprise/entities/computer'

export interface ComputerRepository {
  findById(id: string): Promise<Computer | null>
  findMany(): Promise<Computer[]>
  findByHostname(hostname: string): Promise<Computer | null>
  findByIpAddress(ipAddress: string): Promise<Computer | null>
  findByOperatingSystem(operatingSystem: string): Promise<Computer | null>

  create(computer: Computer): Promise<void>
  save(computer: Computer): Promise<void>
  delete(id: string): Promise<void>
}
