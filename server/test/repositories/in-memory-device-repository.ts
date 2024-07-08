import { DeviceRepository } from '@/domain/it-manager/application/repositories/device-repository'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

export class InMemoryDeviceRepository implements DeviceRepository {
  public items: Device<DeviceProps>[] = []

  async findMany({invoiceNumber, model}: {invoiceNumber?: string, model?: string}): Promise<Device<DeviceProps>[]> {
    if (invoiceNumber && model) {
      return this.items.filter((item) => item.invoiceNumber === invoiceNumber && item.modelSlug === model)
    }

    if (invoiceNumber) {
      return this.items.filter((item) => item.invoiceNumber === invoiceNumber)
    }

    if (model) {
      return this.items.filter((item) => item.modelSlug === model)
    }
    return this.items
  }

  async findById(id: string): Promise<Device<DeviceProps> | null> {
    const device = this.items.find((item) => item.id.toString() === id)

    if (!device) {
      return null
    }
    return device
  }

  async findBySerialNumber(serialNumber: string): Promise<Device<DeviceProps> | null> {
    const device = this.items.find((item) => item.serialNumber === serialNumber)

    if (!device) {
      return null
    }
    return device
  }

  async create(device: Device<DeviceProps>): Promise<void> {
    this.items.push(device)
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(index, 1)
  }

  async save(device: Device<DeviceProps>): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === device.id.toString())

    this.items[index] = device
  }
}
