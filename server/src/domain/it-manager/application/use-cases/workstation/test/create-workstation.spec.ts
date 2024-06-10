import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'
import { CreateWorkstationUseCase } from '../create-workstation'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { makeComputer } from 'test/factories/make-computer'
import { makeDepartment } from 'test/factories/make-department'

let workstationRepository: InMemoryWorkstationRepository
let departmentRepository: InMemoryDepartmentRepository
let computerRepository: InMemoryComputerRepository
let sut: CreateWorkstationUseCase

describe('Register workstation use case', () => {
  beforeEach(() => {
    workstationRepository = new InMemoryWorkstationRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    computerRepository = new InMemoryComputerRepository()

    const computer = makeComputer()
    const department = makeDepartment()
    computerRepository.create(computer)
    departmentRepository.create(department)

    sut = new CreateWorkstationUseCase(workstationRepository, computerRepository, departmentRepository)
  })

  it('should be able to create a workstation', async () => {
    const result = await sut.execute({
      computerId: computerRepository.items[0].id.toString(),
      departmentId: departmentRepository.items[0].id.toString(),
    })

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { workstation } = result.value
      expect(workstation.id).toBeTruthy()
    }
  })

  it('should return a NotFoundError', async () => {
    const result = await sut.execute({
      computerId: 'any_device_id',
      departmentId: 'any_department_id',
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
      departmentId: '',
    })

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      const { name } = result.reason
      expect(name).toEqual('BadRequestError')
    }
  })
})
