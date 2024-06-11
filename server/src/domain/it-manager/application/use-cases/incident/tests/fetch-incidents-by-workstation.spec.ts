import { makeComputer } from 'test/factories/make-computer'
import { makeDepartment } from 'test/factories/make-department'
import { makeDevice } from 'test/factories/make-device'
import { makeIncident } from 'test/factories/make-incident'
import { makeWorkstation } from 'test/factories/make-workstation'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryDeviceRepository } from 'test/repositories/in-memory-device-repository'
import { InMemoryIncidentRepository } from 'test/repositories/in-memory-incident-repository'
import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'

import { FetchIncidentsByWorkstationUseCase } from '../fetch-incidents-by-workstation'

let incidentRepository: InMemoryIncidentRepository
let deviceRepository: InMemoryDeviceRepository
let workstationRepository: InMemoryWorkstationRepository
let computerRepository: InMemoryComputerRepository
let departmentRepository: InMemoryDepartmentRepository

let sut: FetchIncidentsByWorkstationUseCase

describe('Fetch incidents by workstation', () => {
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

    computerRepository.create(computer)
    departmentRepository.create(department)
    deviceRepository.create(device)
    workstationRepository.create(workstation)

    for (let i = 0; i < 10; i++) {
      const incident = makeIncident({
        workstationId: workstation.id,
        deviceId: device.id,
      })
      incidentRepository.create(incident)
    }

    sut = new FetchIncidentsByWorkstationUseCase(incidentRepository, workstationRepository)
  })

  it('should return a list of incidents from a workstation', async () => {
    const result = await sut.execute({
      workstationId: workstationRepository.items[0].id.toString(),
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { incidents } = result.value
      expect(incidents.length).toEqual(10)
    }
  })

  it('should return a NotFoundError', async () => {
    const result = await sut.execute({
      workstationId: 'invalid_id',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({
      workstationId: '',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason

      expect(name).toEqual('BadRequestError')
    }
  })
})
