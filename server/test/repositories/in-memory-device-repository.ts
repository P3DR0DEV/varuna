import { DeviceRepository } from '@/domain/it-manager/application/repositories/device-repository'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

export class InMemoryDeviceRepository implements DeviceRepository {
  public items: Device<DeviceProps>[] = []

  async findMany(): Promise<Device<DeviceProps>[]> {
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

  async findByModel(model: string): Promise<Device<DeviceProps>[]> {
    const devices = this.items.filter((item) => item.model === model)

    return devices
  }

  async findByInvoiceNumber(invoiceNumber: string): Promise<Device<DeviceProps>[]> {
    const devices = this.items.filter((item) => item.invoiceNumber === invoiceNumber)

    return devices
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
