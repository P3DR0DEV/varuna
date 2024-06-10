import { InMemoryIncidentRepository } from 'test/repositories/in-memory-incident-repository'
import { CreateIncidentUseCase } from '../create-incident'
import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'
import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'
import { makeDepartment } from 'test/factories/make-department'
import { makeComputer } from 'test/factories/make-computer'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { CreateWorkstationUseCase } from '../../workstation/create-workstation'
import { makeDevice } from 'test/factories/make-device'

let incidentRepository: InMemoryIncidentRepository
let deviceRepository: InMemoryDeviceRepository
let workstationRepository: InMemoryWorkstationRepository
let computerRepository: InMemoryComputerRepository
let departmentRepository: InMemoryDepartmentRepository

let createWorkstatation: CreateWorkstationUseCase
let sut: CreateIncidentUseCase

describe('Create Incident UseCase', () => {
  beforeEach(async () => {
    incidentRepository = new InMemoryIncidentRepository()
    deviceRepository = new InMemoryDeviceRepository()
    workstationRepository = new InMemoryWorkstationRepository()
    computerRepository = new InMemoryComputerRepository()
    departmentRepository = new InMemoryDepartmentRepository()

    const computer = makeComputer()
    const department = makeDepartment()
    const device = makeDevice()

    computerRepository.create(computer)
    departmentRepository.create(department)
    deviceRepository.create(device)

    createWorkstatation = new CreateWorkstationUseCase(workstationRepository, computerRepository, departmentRepository)
    sut = new CreateIncidentUseCase(incidentRepository, deviceRepository, workstationRepository)

    await createWorkstatation.execute({
      computerId: computerRepository.items[0].id.toString(),
      departmentId: departmentRepository.items[0].id.toString(),
    })
  })

  it('should be able to create an incident', async () => {
    const result = await sut.execute({
      description: 'This is a test description',
      workstationId: workstationRepository.items[0].id.toString(),
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { incident } = result.value
      expect(incident.description).toEqual('This is a test description')
      expect(incident.id).toBeTruthy()
    }
  })

  it('should be able to create an incident to a device', async () => {
    const result = await sut.execute({
      description: 'This is a test with device description',
      workstationId: workstationRepository.items[0].id.toString(),
      deviceId: deviceRepository.items[0].id.toString(),
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { incident } = result.value
      expect(incident.description).toEqual('This is a test with device description')
      expect(incident.deviceId).toBeTruthy()
      expect(incident.id).toBeTruthy()
    }
  })

  it('should return a NotFoundError with invalid workstation id', async () => {
    const result = await sut.execute({
      description: 'This is a test description',
      workstationId: 'invalid_id',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError if params are missing', async () => {
    const result = await sut.execute({
      description: 'This is a test description',
      workstationId: '',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
