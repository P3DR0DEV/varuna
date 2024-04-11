import { Device, DeviceProps } from '../../enterprise/entities/device'

export interface DeviceRepository {
  findMany(): Promise<Device<DeviceProps>[]>
  findById(id: string): Promise<Device<DeviceProps> | null>
  findBySerialNumber(serialNumber: string): Promise<Device<DeviceProps> | null>
  findByModel(model: string): Promise<Device<DeviceProps>[]>
  findByInvoiceNumber(invoiceNumber: string): Promise<Device<DeviceProps>[]>

  create(device: Device<DeviceProps>): Promise<void>
  delete(id: string): Promise<void>
  save(device: Device<DeviceProps>): Promise<void>
}
