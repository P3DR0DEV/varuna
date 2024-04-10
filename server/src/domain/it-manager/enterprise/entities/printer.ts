import { Device, DeviceProps } from '@/core/entities/device'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type PrinterTypes = 'laser' | 'thermal' | 'inkjet' | 'dotmatrix'
export type PrintingOptions = 'colorful' | 'monochrome'
interface PrinterProps extends DeviceProps {
  name: string
  type: PrinterTypes
  printing: PrintingOptions
  ipAddress?: string | null
  observations?: string | null
}
export class Printer extends Device<PrinterProps> {
  get name(): string {
    return this.props.name
  }

  set name(_name: string) {
    this.props.name = _name
    this.touch()
  }

  get type(): PrinterTypes {
    return this.props.type
  }

  set type(_type: PrinterTypes) {
    this.props.type = _type
    this.touch()
  }

  get printing(): PrintingOptions {
    return this.props.printing
  }

  set printing(_printing: PrintingOptions) {
    this.props.printing = _printing
    this.touch()
  }

  get ipAddress(): string | null | undefined {
    return this.props.ipAddress
  }

  set ipAddress(_ipAddress: string | null) {
    this.props.ipAddress = _ipAddress
  }

  get observations(): string | null | undefined {
    return this.props.observations
  }

  set observations(_observations: string | undefined | null) {
    this.props.observations = _observations
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<PrinterProps, 'createdAt'>, id?: UniqueEntityID) {
    const printer = new Printer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return printer
  }
}
