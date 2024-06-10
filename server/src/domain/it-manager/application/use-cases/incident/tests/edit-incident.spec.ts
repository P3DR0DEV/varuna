import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'
import { InMemoryIncidentRepository } from 'test/repositories/in-memory-incident-repository'
import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'
import { EditIncidentUseCase } from '../edit-incident'
import { makeComputer } from 'test/factories/make-computer'
import { makeDepartment } from 'test/factories/make-department'
import { makeDevice } from 'test/factories/make-device'
import { makeIncident } from 'test/factories/make-incident'
import { makeWorkstation } from 'test/factories/make-workstation'

let incidentRepository: InMemoryIncidentRepository
let deviceRepository: InMemoryDeviceRepository
let workstationRepository: InMemoryWorkstationRepository
let computerRepository: InMemoryComputerRepository
let departmentRepository: InMemoryDepartmentRepository

let sut: EditIncidentUseCase

describe('Edit Incident UseCase', () => {
  beforeEach(async () => {
    incidentRepository = new InMemoryIncidentRepository()
    deviceRepository = new InMemoryDeviceRepository()
    workstationRepository = new InMemoryWorkstationRepository()
    computerRepository = new InMemoryComputerRepository()
    departmentRepository = new InMemoryDepartmentRepository()

    const computer = makeComputer()
    const department = makeDepartment()
    const device = makeDevice()

    const workstation = makeWorkstation({
      computerId: computer.id,
      departmentId: computer.id,
    })

    const incident = makeIncident({
      workstationId: workstation.id,
      deviceId: device.id,
    })

    computerRepository.create(computer)
    departmentRepository.create(department)
    deviceRepository.create(device)
    workstationRepository.create(workstation)
    incidentRepository.create(incident)

    sut = new EditIncidentUseCase(incidentRepository)
  })

  it('should be able to edit an incident', async () => {
    const result = await sut.execute({
      id: incidentRepository.items[0].id.toString(),
      description: 'New description',
      workstationId: workstationRepository.items[0].id.toString(),
      deviceId: deviceRepository.items[0].id.toString(),
      fixedAt: new Date(),
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { incident } = result.value
      expect(incident.description).toEqual('New description')
    }
  })

  it('should return a NotFoundError', async () => {
    const result = await sut.execute({
      id: 'invalid_id',
      description: 'New description',
      workstationId: workstationRepository.items[0].id.toString(),
      deviceId: deviceRepository.items[0].id.toString(),
      fixedAt: new Date(),
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({
      id: '',
      description: 'New description',
      workstationId: workstationRepository.items[0].id.toString(),
      deviceId: deviceRepository.items[0].id.toString(),
      fixedAt: new Date(),
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
