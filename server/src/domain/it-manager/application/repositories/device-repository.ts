import type { Device, DeviceProps } from '../../enterprise/entities/device'

export interface DeviceRepository {
  findMany({ invoiceNumber, model }: { invoiceNumber?: string; model?: string }): Promise<Device<DeviceProps>[]>
  findById(id: string): Promise<Device<DeviceProps> | null>
  findBySerialNumber(serialNumber: string): Promise<Device<DeviceProps> | null>
  findByTag(tag: string): Promise<Device<DeviceProps> | null>

  create(device: Device<DeviceProps>): Promise<void>
  delete(id: string): Promise<void>
  save(device: Device<DeviceProps>): Promise<void>
}
