import { makeComputer } from 'test/factories/make-computer'
import { makeDepartment } from 'test/factories/make-department'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'

import { CreateWorkstationUseCase } from '../create-workstation'
import { EditWorkstationUseCase } from '../edit-workstation'

let workstationRepository: InMemoryWorkstationRepository
let computerRepository: InMemoryComputerRepository
let departmentRepository: InMemoryDepartmentRepository

let createWorkstatation: CreateWorkstationUseCase
let sut: EditWorkstationUseCase

describe('Edit workstation use case', () => {
  beforeEach(async () => {
    workstationRepository = new InMemoryWorkstationRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    computerRepository = new InMemoryComputerRepository()

    // create computers and department
    for (let i = 0; i < 3; i++) {
      const computer = makeComputer()
      computerRepository.create(computer)
    }
    const department = makeDepartment()

    departmentRepository.create(department)

    createWorkstatation = new CreateWorkstationUseCase(workstationRepository, computerRepository, departmentRepository)

    sut = new EditWorkstationUseCase(workstationRepository, computerRepository, departmentRepository)

    // create the workstation to be updated
    await createWorkstatation.execute({
      computerId: computerRepository.items[0].id.toString(),
      departmentId: departmentRepository.items[0].id.toString(),
    })
  })

  it('should be able to edit a workstation', async () => {
    // First verification to check if the workstation is going to be updated
    expect(workstationRepository.items[0].computerId).toEqual(computerRepository.items[0].id)

    // update computerId in workstation
    const result = await sut.execute({
      id: workstationRepository.items[0].id.toString(),
      computerId: computerRepository.items[2].id.toString(),
      departmentId: departmentRepository.items[0].id.toString(),
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { workstation } = result.value
      expect(workstation.computerId).toEqual(computerRepository.items[2].id)
    }
  })

  it('should return a NotFoundError to non-existent workstation', async () => {
    const result = await sut.execute({
      id: 'invalid_id',
      computerId: 'invalid_id',
      departmentId: 'invalid_id',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('NotFoundError')
    }
  })

  it('should return a NotFoundError to non-existent computer or department', async () => {
    const result = await sut.execute({
      id: workstationRepository.items[0].id.toString(),
      computerId: 'invalid_id',
      departmentId: 'invalid_id',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({
      id: '',
      computerId: '',
      departmentId: '',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      expect(result.reason.name).toEqual('BadRequestError')
    }
  })
})
