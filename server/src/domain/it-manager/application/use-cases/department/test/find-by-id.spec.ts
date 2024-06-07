import { InMemoryDepartmentRepository } from 'test/repositories/in-memory-department-repository'
import { FindByIdUseCase } from '../find-by-id'
import { RegisterDepartmentUseCase } from '../register'

let departmentsRepository: InMemoryDepartmentRepository
let sut: FindByIdUseCase
let register: RegisterDepartmentUseCase

describe('Find departments by id use case', () => {
  beforeEach(async () => {
    departmentsRepository = new InMemoryDepartmentRepository()
    sut = new FindByIdUseCase(departmentsRepository)
    register = new RegisterDepartmentUseCase(departmentsRepository)
    for (let i = 0; i < 5; i++) {
      await register.execute({
        description: 'department description',
        email: 'any_email@example.com',
      })
    }
  })

  it('should find a department by id', async () => {
    const result = await sut.execute(departmentsRepository.items[0].id.toString())

    expect(result.isSuccess()).toBeTruthy()

    if (result.isSuccess()) {
      const { department } = result.value

      expect(department).toEqual(
        expect.objectContaining({
          description: 'department description',
          email: 'any_email@example.com',
        }),
      )
    }
  })

  it('should return a NotFoundError', async () => {
    const result = await sut.execute('invalid_id')

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      expect(result.reason.name).toBeInstanceOf('NotFoundError')
    }
  })

  it('should return a BadRequestError', async () => {
    const result = await sut.execute('')

    expect(result.isFailure()).toBeTruthy()

    if (result.isFailure()) {
      expect(result.reason.name).toBeInstanceOf('BadRequestError')
    }
  })
})
