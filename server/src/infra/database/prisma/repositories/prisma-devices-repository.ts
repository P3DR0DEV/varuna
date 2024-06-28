import { PrismaClient } from '@prisma/client'

import { DeviceRepository } from '@/domain/it-manager/application/repositories/device-repository'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

export class PrismaDevicesRepository implements DeviceRepository {
  constructor(private prisma: PrismaClient) {}

  findMany(): Promise<Device<DeviceProps>[]> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Device<DeviceProps> | null> {
    throw new Error('Method not implemented.')
  }

  findBySerialNumber(serialNumber: string): Promise<Device<DeviceProps> | null> {
    throw new Error('Method not implemented.')
  }

  findByModel(model: string): Promise<Device<DeviceProps>[]> {
    throw new Error('Method not implemented.')
  }

  findByInvoiceNumber(invoiceNumber: string): Promise<Device<DeviceProps>[]> {
    throw new Error('Method not implemented.')
  }

  create(device: Device<DeviceProps>): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(device: Device<DeviceProps>): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
