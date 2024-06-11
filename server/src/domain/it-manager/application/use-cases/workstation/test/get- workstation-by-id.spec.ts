import { makeComputer } from 'test/factories/make-computer'
import { makeDepartment } from 'test/factories/make-department'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'

import { CreateWorkstationUseCase } from '../create-workstation'
import { GetWorkstationByIdUseCase } from '../get-workstation-by-id'

let workstationRepository: InMemoryWorkstationRepository
let departmentRepository: InMemoryDepartmentRepository
let computerRepository: InMemoryComputerRepository

let createWorkstation: CreateWorkstationUseCase
let sut: GetWorkstationByIdUseCase

describe('Get workstation by id use case', () => {
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

    sut = new GetWorkstationByIdUseCase(workstationRepository)
  })

  it('should be able to find a workstation by id', async () => {
    const result = await sut.execute({ id: workstationRepository.items[0].id.toString() })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { workstation } = result.value
      expect(workstation.id).toEqual(workstationRepository.items[0].id)
    }
  })

  it('should return a NotFoundError to non-existent workstation', async () => {
    const result = await sut.execute({ id: 'invalid_id' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError to non-existent workstation', async () => {
    const result = await sut.execute({ id: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
