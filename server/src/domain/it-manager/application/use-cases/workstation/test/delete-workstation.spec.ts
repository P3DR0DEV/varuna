import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'
import { DeleteWorkstationUseCase } from '../delete-workstation'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { makeComputer } from 'test/factories/make-computer'
import { makeDepartment } from 'test/factories/make-department'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { CreateWorkstationUseCase } from '../create-workstation'

let workstationRepository: InMemoryWorkstationRepository
let computerRepository: InMemoryComputerRepository
let departmentRepository: InMemoryDepartmentRepository

let createWorkstatation: CreateWorkstationUseCase
let sut: DeleteWorkstationUseCase

describe('Delete workstation use case', () => {
  beforeEach(async () => {
    workstationRepository = new InMemoryWorkstationRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    computerRepository = new InMemoryComputerRepository()

    const computer = makeComputer()
    const department = makeDepartment()

    computerRepository.create(computer)
    departmentRepository.create(department)

    createWorkstatation = new CreateWorkstationUseCase(workstationRepository, computerRepository, departmentRepository)
    sut = new DeleteWorkstationUseCase(workstationRepository)

    await createWorkstatation.execute({
      computerId: computerRepository.items[0].id.toString(),
      departmentId: departmentRepository.items[0].id.toString(),
    })
  })

  it('should be able to delete a workstation', async () => {
    const result = await sut.execute({ id: workstationRepository.items[0].id.toString() })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { message } = result.value
      expect(message).toEqual('Workstation deleted successfully')
    }
  })

  it('should return a NotFoundError with invalid id', async () => {
    const result = await sut.execute({ id: 'invalid_id' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a NotFoundError when multiple deletions', async () => {
    const id = workstationRepository.items[0].id.toString()
    // delete the workstation for the first time
    await sut.execute({ id })

    // tries to delete it again
    const result = await sut.execute({ id })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute({ id: '' })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
