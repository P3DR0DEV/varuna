import { makeComputer } from 'test/factories/make-computer.js'
import { makeDepartment } from 'test/factories/make-department.js'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository.js'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository.js'
import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'

import { CreateWorkstationUseCase } from '../create-workstation.js'
import { GetWorkstationByComputerId } from '../get-workstation-by-computer-id.js'

let workstationRepository: InMemoryWorkstationRepository
let departmentRepository: InMemoryDepartmentRepository
let computerRepository: InMemoryComputerRepository
let createWorkstation: CreateWorkstationUseCase
let sut: GetWorkstationByComputerId

describe('Get workstation by computer id use case', () => {
  beforeEach(async () => {
    workstationRepository = new InMemoryWorkstationRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    computerRepository = new InMemoryComputerRepository()

    const computer = makeComputer()
    const department = makeDepartment()
    computerRepository.create(computer)
    departmentRepository.create(department)

    createWorkstation = new CreateWorkstationUseCase(workstationRepository, computerRepository, departmentRepository)

    await createWorkstation.execute({
      computerId: computer.id.toString(),
      departmentId: department.id.toString(),
    })

    sut = new GetWorkstationByComputerId(workstationRepository)
  })

  it('should be able to find a workstation by device id', async () => {
    const result = await sut.execute({
      computerId: computerRepository.items[0].id.toString(),
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { workstation } = result.value
      expect(workstation.computerId).toEqual(computerRepository.items[0].id)
    }
  })

  it('should return a NotFoundError to non-existent relationship', async () => {
    const result = await sut.execute({
      computerId: 'invalid_id',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({
      computerId: '',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
