import { PrismaClient } from '@prisma/client'

import { DeviceRepository } from '@/domain/it-manager/application/repositories/device-repository'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'

import { PrismaDevicesMapper } from '../mappers/prisma-devices-mapper'

export class PrismaDevicesRepository implements DeviceRepository {
  constructor(private prisma: PrismaClient) {}

  async findByTag(tag: string): Promise<Device<DeviceProps> | null> {
    const device = await this.prisma.device.findUnique({
      where: { tag },
    })

    if (!device) {
      return null
    }

    return PrismaDevicesMapper.toDomain(device)
  }
  async findMany({ invoiceNumber, model }: { invoiceNumber?: string; model?: string }): Promise<Device<DeviceProps>[]> {
    const devices = await this.prisma.device.findMany({
      where: { invoiceNumber, model },
    })

    return devices.map(PrismaDevicesMapper.toDomain)
  }

  async findById(id: string): Promise<Device<DeviceProps> | null> {
    const device = await this.prisma.device.findUnique({
      where: { id },
    })

    if (!device) {
      return null
    }

    return PrismaDevicesMapper.toDomain(device)
  }

  async findBySerialNumber(serialNumber: string): Promise<Device<DeviceProps> | null> {
    const device = await this.prisma.device.findUnique({
      where: { serialNumber },
    })

    if (!device) {
      return null
    }

    return PrismaDevicesMapper.toDomain(device)
  }

  async create(device: Device<DeviceProps>): Promise<void> {
    const data = PrismaDevicesMapper.toPersistence(device)

    await this.prisma.device.create({ data })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.device.delete({ where: { id } })
  }

  async save(device: Device<DeviceProps>): Promise<void> {
    const data = PrismaDevicesMapper.toPersistence(device)

    await this.prisma.device.update({
      where: { id: data.id },
      data,
    })
  }
}
