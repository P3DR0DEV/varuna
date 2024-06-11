import { makeComputer } from 'test/factories/make-computer'
import { makeDepartment } from 'test/factories/make-department'
import { InMemoryComputerRepository } from 'test/repositories/in-memory-computer-repository'
import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { InMemoryWorkstationRepository } from 'test/repositories/in-memory-workstation-repository'

import { CreateWorkstationUseCase } from '../create-workstation'
import { FetchAllWorkstationsUseCase } from '../fetch-all-workstations'

let workstationRepository: InMemoryWorkstationRepository
let departmentRepository: InMemoryDepartmentRepository
let computerRepository: InMemoryComputerRepository
let createWorkstation: CreateWorkstationUseCase
let sut: FetchAllWorkstationsUseCase

describe('Fetch all workstations use case', () => {
  beforeEach(() => {
    workstationRepository = new InMemoryWorkstationRepository()
    departmentRepository = new InMemoryDepartmentRepository()
    computerRepository = new InMemoryComputerRepository()
    createWorkstation = new CreateWorkstationUseCase(workstationRepository, computerRepository, departmentRepository)

    for (let i = 0; i < 5; i++) {
      const computer = makeComputer()
      const department = makeDepartment()
      computerRepository.create(computer)
      departmentRepository.create(department)

      createWorkstation.execute({
        computerId: computer.id.toString(),
        departmentId: department.id.toString(),
      })
    }
    sut = new FetchAllWorkstationsUseCase(workstationRepository)
  })
  it('should be able to find all workstations', async () => {
    const result = await sut.execute()

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { workstations } = result.value

      expect(workstations).toHaveLength(5)
    }
  })
})
