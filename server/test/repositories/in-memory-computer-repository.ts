import { ComputerRepository } from '@/domain/it-manager/application/repositories/computer-repository'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'

export class InMemoryComputerRepository implements ComputerRepository {
  public items: Computer[] = []

  async findById(id: string): Promise<Computer | null> {
    const computer = this.items.find((item) => item.id.toString() === id)
    if (!computer) {
      return null
    }

    return computer
  }

  async findMany(): Promise<Computer[]> {
    return this.items
  }

  async findByHostname(hostname: string): Promise<Computer | null> {
    const computer = this.items.find((item) => item.hostname === hostname)

    if (!computer) {
      return null
    }
    return computer
  }

  async findByIpAddress(ipAddress: string): Promise<Computer | null> {
    const computer = this.items.find((item) => item.ipAddress === ipAddress)

    if (!computer) {
      return null
    }
    return computer
  }

  async findByOperatingSystem(operatingSystem: string): Promise<Computer | null> {
    const computer = this.items.find((item) => item.operatingSystem.value === operatingSystem)

    if (!computer) {
      return null
    }
    return computer
  }

  async create(computer: Computer): Promise<void> {
    this.items.push(computer)
  }

  async save(computer: Computer): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === computer.id.toString())
    this.items[index] = computer
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id)
    this.items.splice(index, 1)
  }
}
