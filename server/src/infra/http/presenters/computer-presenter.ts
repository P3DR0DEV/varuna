import { Computer } from '@/domain/it-manager/enterprise/entities/computer'

export class ComputerPresenter {
  static toHttp(computer: Computer) {
    return {
      id: computer.id.toString(),
      acquisitionDate: computer.acquisitionDate,
      description: computer.description,
      hostname: computer.hostname,
      ipAddress: computer.ipAddress,
      model: computer.model,
      operatingSystem: computer.operatingSystem,
      serialNumber: computer.serialNumber,
      type: computer.type,
      contractId: computer.contractId,
      endWarrantyDate: computer.endWarrantyDate,
      invoiceNumber: computer.invoiceNumber,
    }
  }
}
